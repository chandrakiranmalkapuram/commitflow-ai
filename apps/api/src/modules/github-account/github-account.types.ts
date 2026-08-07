import { z } from 'zod';

export const ConnectGithubAccountSchema = z.object({
  githubUserId: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional(),
  accessToken: z.string(),
});

export type ConnectGithubAccountRequest = z.infer<typeof ConnectGithubAccountSchema>;

export interface GithubAccountDto {
  id: string;
  userId: string;
  githubUserId: string;
  username: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
