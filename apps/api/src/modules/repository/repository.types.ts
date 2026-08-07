import { z } from 'zod';

export const AddRepositorySchema = z.object({
  organizationId: z.string(),
  githubRepositoryId: z.string(),
  name: z.string(),
  owner: z.string(),
  defaultBranch: z.string().optional(),
  installationId: z.string().optional(),
});

export type AddRepositoryRequest = z.infer<typeof AddRepositorySchema>;

export interface RepositoryDto {
  id: string;
  organizationId: string;
  githubRepositoryId: string;
  name: string;
  owner: string;
  defaultBranch: string;
  installationId: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
