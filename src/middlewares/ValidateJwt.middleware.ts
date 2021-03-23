/**
 * @file JWT Middleware
 * @summary Validates JWT API Key
 */
import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/constants';

export async function validateJwt(request: Request, response: Response, next: NextFunction) {
  const token = request.header('x-api-key');

  if (!token) {
    return response.status(401).json({
      success: false,
      message: 'Error getting token'
    })
  }

  try {
    const { user } = jwt.verify(token, JWT_SECRET) as any;

    request['user'] = user;
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: 'Invalid JWT Token'
    })
  }

  next();
}