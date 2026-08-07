import { Response } from 'express';
import { githubAccountService } from './github-account.service.js';
import { ConnectGithubAccountSchema } from './github-account.types.js';
import { AuthenticatedRequest } from '../auth/auth.middleware.js';

export class GithubAccountController {
  async connect(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const data = ConnectGithubAccountSchema.parse(req.body);
      const result = await githubAccountService.connectAccount(req.user.userId, data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMyAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const result = await githubAccountService.getAccount(req.user.userId);
      if (!result) {
        res.status(404).json({ error: 'GitHub account not found' });
        return;
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async handleCallback(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const code = req.query.code as string;
      if (!code) {
        res.status(400).json({ error: 'Missing code parameter' });
        return;
      }

      const result = await githubAccountService.handleCallback(req.user.userId, code);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const githubAccountController = new GithubAccountController();
