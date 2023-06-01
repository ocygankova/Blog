import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  let statusCode = 500;
  let errorMessage = 'An unknown error occurred';

  if (isHttpError(err)) {
    statusCode = err.status;
    errorMessage = err.message;
  }
  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
