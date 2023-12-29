import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token =
    request.headers.authorization &&
    request.headers.authorization.split(' ')[1];

  if (!token) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const secret = process.env.SECRET_KEY as jwt.Secret;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ message: ' Token invalid' });
    }

    request.body.user = decoded;

    next();
  });
}
