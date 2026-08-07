import { prismaService } from '../db/prisma.service.js';
import { GithubAccount } from '@prisma/client';

export class GithubAccountRepository {
  private get prisma() {
    return prismaService.client;
  }

  async upsert(data: {
    userId: string;
    githubUserId: string;
    username: string;
    avatarUrl?: string;
    accessToken: string;
  }): Promise<GithubAccount> {
    return this.prisma.githubAccount.upsert({
      where: { userId: data.userId },
      update: {
        githubUserId: data.githubUserId,
        username: data.username,
        avatarUrl: data.avatarUrl,
        accessToken: data.accessToken,
      },
      create: {
        userId: data.userId,
        githubUserId: data.githubUserId,
        username: data.username,
        avatarUrl: data.avatarUrl,
        accessToken: data.accessToken,
      },
    });
  }

  async findByUserId(userId: string): Promise<GithubAccount | null> {
    return this.prisma.githubAccount.findUnique({
      where: { userId },
    });
  }
}

export const githubAccountRepository = new GithubAccountRepository();
