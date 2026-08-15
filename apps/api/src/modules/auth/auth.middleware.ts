import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';

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
