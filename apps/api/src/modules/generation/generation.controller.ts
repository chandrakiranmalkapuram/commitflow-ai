import { Response } from 'express';
import { AuthenticatedRequest } from '../auth/auth.middleware.js';
import { generationService } from './generation.service.js';
import { organizationRepository } from '../organization/organization.repository.js';

export class GenerationController {
  private async checkAccess(req: AuthenticatedRequest, res: Response, organizationId: string): Promise<boolean> {
    if (!req.user?.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return false;
    }
    
    if (!organizationId) {
      res.status(400).json({ error: 'organizationId query parameter is required' });
      return false;
    }

    const isMember = await organizationRepository.isMember(req.user.userId, organizationId);
    if (!isMember) {
      res.status(403).json({ error: 'Forbidden: You do not have access to this organization' });
      return false;
    }
    return true;
  }

  async listGenerations(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const organizationId = req.query.organizationId?.toString();
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }
      if (!(await this.checkAccess(req, res, organizationId))) return;

      const generations = await generationService.listGenerations(organizationId);
      res.status(200).json(generations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGeneration(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const organizationId = req.query.organizationId?.toString();
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }
      if (!(await this.checkAccess(req, res, organizationId))) return;

      const id = req.params.id as string;
      const generation = await generationService.getGeneration(id, organizationId);
      
      if (!generation) {
        res.status(404).json({ error: 'Generation not found' });
        return;
      }
      
      res.status(200).json(generation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGenerationContent(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const organizationId = req.query.organizationId?.toString();
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }
      if (!(await this.checkAccess(req, res, organizationId))) return;

      const id = req.params.id as string;
      const content = await generationService.getGenerationContent(id, organizationId);
      
      res.status(200).json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const generationController = new GenerationController();
