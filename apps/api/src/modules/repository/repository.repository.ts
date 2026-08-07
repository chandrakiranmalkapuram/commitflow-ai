import { prismaService } from '../db/prisma.service.js';
import { AddRepositoryRequest } from './repository.types.js';
import { Repository } from '@prisma/client';

export class RepositoryRepository {
  private get prisma() {
    return prismaService.client;
  }

  async create(data: AddRepositoryRequest): Promise<Repository> {
    return this.prisma.repository.create({
      data: {
        organizationId: data.organizationId,
        githubRepositoryId: data.githubRepositoryId,
        name: data.name,
        owner: data.owner,
        defaultBranch: data.defaultBranch || 'main',
        installationId: data.installationId,
      },
    });
  }

  async findByOrganization(organizationId: string): Promise<Repository[]> {
    return this.prisma.repository.findMany({
      where: { organizationId },
    });
  }

  async findByOwnerAndName(owner: string, name: string): Promise<Repository | null> {
    return this.prisma.repository.findUnique({
      where: {
        owner_name: { owner, name },
      },
    });
  }

  async updateActiveStatus(id: string, active: boolean): Promise<Repository> {
    return this.prisma.repository.update({
      where: { id },
      data: { active },
    });
  }
}

export const repositoryRepository = new RepositoryRepository();
