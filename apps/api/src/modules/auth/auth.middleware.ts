import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';


declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

// Kept for backward compatibility if any files still use it explicitly
export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (typeof req.query.token === 'string') {
    token = req.query.token;
  }

  if (token) {
    const secret = env.JWT_SECRET;

    try {
      const decoded = jwt.verify(token, secret) as { userId: string };
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
};
