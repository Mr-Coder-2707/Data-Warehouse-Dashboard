import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY || 'secret-key';

export const apiKeyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid or missing API key'
    });
  }
};
