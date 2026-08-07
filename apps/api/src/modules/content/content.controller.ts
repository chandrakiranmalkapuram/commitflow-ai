import { Response } from 'express';
import { AuthenticatedRequest } from '../auth/auth.middleware.js';
import { contentService } from './content.service.js';
import { organizationRepository } from '../organization/organization.repository.js';

export class ContentController {
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

  async approveContent(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const organizationId = req.query.organizationId?.toString();
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }
      if (!(await this.checkAccess(req, res, organizationId))) return;

      const id = req.params.id as string;
      const content = await contentService.approveContent(id, organizationId);
      
      res.status(200).json(content);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async rejectContent(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const organizationId = req.query.organizationId?.toString();
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }
      if (!(await this.checkAccess(req, res, organizationId))) return;

      const id = req.params.id as string;
      const content = await contentService.rejectContent(id, organizationId);
      
      res.status(200).json(content);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export const contentController = new ContentController();
