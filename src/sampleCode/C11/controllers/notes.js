import express from "express";
import Note from "../models/note";
import mongoose from "mongoose";

const notesRouter = express.Router();

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.post("/", async (request, response,next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save().catch((error) => {
      next(error)
  });
  response.status(201).json(savedNote);
});

notesRouter.get("/:id", async (request, response,next) => {

  const note = await Note.findById(request.params.id).catch((error) => {
    next(error)
  });
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

export default notesRouter;
