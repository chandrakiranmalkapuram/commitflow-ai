export interface DashboardStats {
  repositoryCount: number;
  generationCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
}

export type ContentStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'FAILED';

export interface Generation {
  id: string;
  organizationId: string;
  commitSha: string;
  owner: string;
  repo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
