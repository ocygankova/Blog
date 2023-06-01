import { RequestHandler } from 'express';
import { Schema, ValidationError } from 'yup';
import createHttpError from 'http-errors';

const validateRequestSchema =
  (schema: Schema): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.validate(req);
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        next(createHttpError(400, err.message));
      } else {
        next(err);
      }
    }
  };

export default validateRequestSchema;
