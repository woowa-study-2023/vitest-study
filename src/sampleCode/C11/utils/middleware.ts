import { NextFunction, Request, Response } from "express";

const unknownEndpoint = (_: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

export default {
  errorHandler,
  unknownEndpoint,
};
