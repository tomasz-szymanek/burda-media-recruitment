import { badRequest } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { validationSchema } from "./schema";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = validationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validationResult.error) {
    const error = badRequest("Bad Request", validationResult.error.details);
    res.status(error.output.statusCode).json(error);
  }

  next();
};
