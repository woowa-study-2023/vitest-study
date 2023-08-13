import supertest  from 'supertest'
import  app from '../sampleCode/C11/app'
import mongoose from 'mongoose'
import helper from '../sampleCode/C11/testHelper'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Note from '../sampleCode/C11/models/note'

const api = supertest(app)

let mongod: MongoMemoryServer;


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
await Promise.all(helper.initialNotes.map( async (note)=>{
  return new Note({
    content:note.content,
    important:note.important
  }).save()
 }))
});

test('모든 노트를 불러올 수 있다.', async () => {
  const response = await api.get('/api/notes')
  const notes = response.body.map(({content, important}:any)=>{return {content, important}})
  expect(JSON.stringify(notes)).toEqual(JSON.stringify(helper.initialNotes))
})

test('특정 노트를 불러올 수 있다', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]
  const resultNote = await api.get(`/api/notes/${(noteToView as any).id}`)
  expect(resultNote.body).toEqual(noteToView)
})

test('특정 노트를 삭제할 수 있다', async () => {
  const notesAtStart = await helper.notesInDb()
  const id = (notesAtStart[0] as any).id
  await api.delete(`/api/notes/${id}`)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd.length).toBe(notesAtStart.length - 1)
})

test('특정 노트를 수정할 수 있다', async () => {
  const notesAtStart = await helper.notesInDb()
  const id = (notesAtStart[0] as any).id
  const noteToChange = {
    content: 'updated note',
    important: true
  }
  await api.put(`/api/notes/${id}`).send(noteToChange)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd[0]).toEqual({...noteToChange, id})
})

test('특정 노트를 추가할 수 있다', async () => {
  const newNote = {
    content: 'new note',
    important: true
  }
  await api.post('/api/notes').send(newNote)

  const notesAtEnd = await helper.notesInDb()
  const resultNote = notesAtEnd.find((note)=>note.content === newNote.content)
  expect(resultNote).toEqual({...newNote, id: (resultNote as any)?.id})
})

test('특정 노트를 추가할 때 content가 없으면 400을 반환한다', async () => {
  const newNote = {
    important: true
  }
  await api.post('/api/notes').send(newNote).expect(400)
})

test('특정 노트를 조회할 때 id가 유효하지 않으면 400를 반환한다', async () => {
  const invalidId = '1234'
  await api.get(`/api/notes/${invalidId}`).expect(400)
})

afterEach(async()=>{
  await clear()
})


afterAll(async () => {
await close()
  });




