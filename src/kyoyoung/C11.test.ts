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


afterAll(async () => {
await close()
  });

