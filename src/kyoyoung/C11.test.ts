import supertest  from 'supertest'
import  app from '../sampleCode/C11/app'
import mongoose from 'mongoose'
import helper from '../sampleCode/C11/testHelper'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Note from '../sampleCode/C11/models/note'

const api = supertest(app)

let mongod: MongoMemoryServer;



// For mongodb-memory-server's old version (< 7) use this instead:
// const mongoServer = new MongoMemoryServer();

const opts = {
  useUnifiedTopology: true,
};

// Provide connection to a new in-memory database server.
const connect = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect();

  mongod = await MongoMemoryServer.create();

  const mongoUri = await mongod.getUri();
  await mongoose.connect(mongoUri ).then(()=>{
    console.log('연결되었다!!!!!')
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
await connect()
});



beforeEach(async () => {
await helper.initialNotes.map((note)=>{
  new Note({
    content:note.content,
    important:note.important
  }).save()
 })
});


afterEach(async()=>{
  await clear()
})

describe('when there is initially some notes saved', () => {


  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contents = response.body.map((r:any) => r.content)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${(noteToView as any).id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultNote.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()


      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })


    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${(noteToDelete as any).id}`)
        .expect(204)
     const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
      )

      const contents = notesAtEnd.map(r => r.content)

      expect(contents).not.toContain(noteToDelete.content)
    })
  })
})

afterAll(async () => {
await close()
  });

