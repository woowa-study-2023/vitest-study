import express from 'express'
import mongoose from 'mongoose'
import notesRouter from './controllers/notes'
import middleware from './utils/middleware'
import { MongoMemoryServer }  from "mongodb-memory-server";

const mongod = await MongoMemoryServer.create();
const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(mongod.getUri()).then((result) => {
    console.log(result.connection.readyState)  
    console.log(result.connection.host)
})

app.use(express.static('build'))
app.use(express.json())

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app