import { repositoryRepository } from './repository.repository.js';
import { AddRepositoryRequest, RepositoryDto } from './repository.types.js';

export class RepositoryService {
  async addRepository(data: AddRepositoryRequest): Promise<RepositoryDto> {
    const existing = await repositoryRepository.findByOwnerAndName(data.owner, data.name);
    if (existing) {
      throw new Error('Repository already added');
    }

    const repo = await repositoryRepository.create(data);
    return repo;
  }

  async listByOrganization(organizationId: string): Promise<RepositoryDto[]> {
    return repositoryRepository.findByOrganization(organizationId);
  }

  async toggleActive(id: string, active: boolean): Promise<RepositoryDto> {
    return repositoryRepository.updateActiveStatus(id, active);
  }

  async findByOwnerAndName(owner: string, name: string): Promise<RepositoryDto | null> {
    return repositoryRepository.findByOwnerAndName(owner, name);
  }
}

export const repositoryService = new RepositoryService();
