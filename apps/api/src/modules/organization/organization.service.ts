import { organizationRepository } from './organization.repository.js';
import { CreateOrganizationDto } from './organization.types.js';
import { Organization } from '@prisma/client';

export class OrganizationService {
  async createOrganization(data: CreateOrganizationDto): Promise<Organization> {
    // 1. Create org
    const org = await organizationRepository.create(data);
    
    // 2. Add owner as a member with OWNER role
    await organizationRepository.addMember({
      organizationId: org.id,
      userId: data.ownerId,
      role: 'OWNER',
    });

    return org;
  }

  async findById(id: string): Promise<Organization | null> {
    return organizationRepository.findById(id);
  }

  async findOrCreateByName(name: string, ownerId: string): Promise<Organization> {
    let org = await organizationRepository.findByName(name);
    if (!org) {
      org = await this.createOrganization({ name, ownerId });
    }
    return org;
  }

  async getUserOrganizations(userId: string) {
    const memberships = await organizationRepository.getMemberships(userId);
    return memberships.map((m) => m.organization);
  }
}

export const organizationService = new OrganizationService();
