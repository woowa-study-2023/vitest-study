import supertest from "supertest";
import app from "../../sampleCode/C11/app";
import mongoose from "mongoose";
import helper from "../../sampleCode/C11/testHelper";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import Note from "../../sampleCode/C11/models/note";

interface INote {
  content: string;
  important: boolean;
  id: string;
}

const api = supertest(app);

let mongod: MongoMemoryServer;

// Provide connection to a new in-memory database server.
const connect = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect();

  mongod = await MongoMemoryServer.create();

  const mongoUri = await mongod.getUri();
  await mongoose.connect(mongoUri).then(() => {
    console.log("연결되었다!!!!!");
  });
};

// Remove and close the database and server.
const close = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

// Remove all data from collections
const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await Promise.all(
    helper.initialNotes.map(async (note) => {
      return new Note({
        content: note.content,
        important: note.important,
      }).save();
    })
  );
});

describe("GET API 테스트", () => {
  test("모든 노트를 가져온다.", async () => {
    const response = await api.get("/api/notes");
    const notes = response.body.map((note: INote) => ({
      content: note.content,
      important: note.important,
    }));

    expect(notes).toEqual(helper.initialNotes);
  });

  test("특정 노트를 가져온다.", async () => {
    const notes = await helper.notesInDb();
    const firstNoteId = (notes[0] as any).id;

    const response = await api.get(`/api/notes/${firstNoteId}`);

    expect(response.body).toEqual(notes[0]);
  });
});

describe("POST API 테스트", () => {
  test("db에 노트를 추가한다.", async () => {
    const newNote = {
      content: "Hello World",
      important: true,
    };

    await api.post("/api/notes").send(newNote);

    const notes = await helper.notesInDb();
    expect(notes).toHaveLength(helper.initialNotes.length + 1);
  });
});

describe("DELETE API 테스트", () => {
  test("특정 노트를 삭제한다.", async () => {
    const notes = await helper.notesInDb();
    const firstNoteId = (notes[0] as any).id;

    await api.delete(`/api/notes/${firstNoteId}`);

    const notesAfterDelete = await helper.notesInDb();
    expect(notesAfterDelete).toHaveLength(helper.initialNotes.length - 1);
  });
});

describe("PUT API 테스트", () => {
  test("특정 노트를 수정한다.", async () => {
    const notes = await helper.notesInDb();
    const firstNoteId = (notes[0] as any).id;
    const newNote = {
      content: "Hello World",
      important: true,
    };

    await api.put(`/api/notes/${firstNoteId}`).send(newNote);

    const notesAfterUpdate = await helper.notesInDb();
    expect(notesAfterUpdate[0]).toEqual({
      ...newNote,
      id: firstNoteId,
    });
  });
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await close();
});
