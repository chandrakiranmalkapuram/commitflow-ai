import { Response } from 'express';
import { repositoryService } from './repository.service.js';
import { AddRepositorySchema } from './repository.types.js';
import { AuthenticatedRequest } from '../auth/auth.middleware.js';

export class RepositoryController {
  async add(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = AddRepositorySchema.parse(req.body);
      const result = await repositoryService.addRepository(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const organizationId = req.query.organizationId as string;
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }
      
      const result = await repositoryService.listByOrganization(organizationId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async toggleActive(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { active } = req.body;
      
      if (typeof active !== 'boolean') {
        res.status(400).json({ error: 'active boolean is required' });
        return;
      }

      const result = await repositoryService.toggleActive(id, active);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const repositoryController = new RepositoryController();
