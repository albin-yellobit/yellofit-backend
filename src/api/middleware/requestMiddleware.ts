import { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.url}`, {
    ip: req.ip,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });
  next();
};