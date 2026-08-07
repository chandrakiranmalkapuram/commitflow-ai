import { prismaService } from '../db/prisma.service.js';

export interface DashboardStatsDto {
  repositoryCount: number;
  generationCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
}

export class DashboardService {
  private get prisma() {
    return prismaService.client;
  }

  async getDashboardStats(organizationId: string): Promise<DashboardStatsDto> {
    const [
      repositoryCount,
      generationCount,
      pendingApprovalCount,
      publishedCount,
    ] = await Promise.all([
      this.prisma.repository.count({ where: { organizationId, active: true } }),
      this.prisma.generation.count({ where: { organizationId } }),
      this.prisma.generatedContent.count({ 
        where: { 
          generation: { organizationId }, 
          status: 'PENDING_APPROVAL' 
        } 
      }),
      this.prisma.generatedContent.count({ 
        where: { 
          generation: { organizationId }, 
          status: 'PUBLISHED' 
        } 
      }),
    ]);

    return {
      repositoryCount,
      generationCount,
      pendingApprovalCount,
      publishedCount,
    };
  }
}

export const dashboardService = new DashboardService();
