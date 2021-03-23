import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function ValidateFields(request: Request, response: Response, next: NextFunction) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).send({ success: false, errors: errors.mapped() });
  }
  next();
}