export interface Repository {
  id: string;
  organizationId: string;
  githubRepositoryId: string;
  name: string;
  owner: string;
  defaultBranch: string;
  installationId?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
