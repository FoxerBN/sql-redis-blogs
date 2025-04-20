import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../../interfaces/ErrorResponse';
import logger from '../../config/logger.config';

export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const shortStack = err.stack ? err.stack.split('\n')[0] : '';
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, { stack: shortStack + " - " + req.ip});
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : shortStack,
  });
}
