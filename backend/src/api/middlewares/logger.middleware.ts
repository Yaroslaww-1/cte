import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Request: url=${req.url}`);
  console.log('req.body', req.body);
  next();
};
