import { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { RegisterSchema, LoginSchema, RefreshTokenSchema } from './auth.types.js';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = RegisterSchema.parse(req.body);
      const result = await authService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = LoginSchema.parse(req.body);
      const result = await authService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const data = RefreshTokenSchema.parse(req.body);
      const tokens = await authService.refreshTokens(data.refreshToken);
      res.status(200).json(tokens);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // In a stateless JWT setup, logout is typically handled client-side by deleting tokens.
    // For completeness, we return a 200 OK.
    res.status(200).json({ message: 'Logged out successfully' });
  }
}

export const authController = new AuthController();
