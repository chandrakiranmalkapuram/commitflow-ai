import { Response } from 'express';
import { AuthenticatedRequest } from '../auth/auth.middleware.js';
import { dashboardService } from './dashboard.service.js';
import { organizationRepository } from '../organization/organization.repository.js';

export class DashboardController {
  async getDashboardStats(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const organizationId = req.query.organizationId?.toString();
      if (!organizationId) {
        res.status(400).json({ error: 'organizationId query parameter is required' });
        return;
      }

      // Verify the user is a member of this organization
      const isMember = await organizationRepository.isMember(req.user.userId, organizationId);
      if (!isMember) {
        res.status(403).json({ error: 'Forbidden: You do not have access to this organization' });
        return;
      }

      const stats = await dashboardService.getDashboardStats(organizationId);
      res.status(200).json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const dashboardController = new DashboardController();
