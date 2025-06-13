import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authentication failed: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: 'Server error: JWT secret not configured' });
    return;
  }

  try {
    jwt.verify(token, secret);
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed: Invalid token' });
    return;
  }
};