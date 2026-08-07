import { prismaService } from '../db/prisma.service.js';
import { CreateOrganizationDto, AddMemberDto } from './organization.types.js';
import { Organization, OrganizationMember } from '@prisma/client';

export class OrganizationRepository {
  private get prisma() {
    return prismaService.client;
  }

  async create(data: CreateOrganizationDto): Promise<Organization> {
    return this.prisma.organization.create({ data });
  }

  async findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Organization | null> {
    return this.prisma.organization.findFirst({ where: { name } });
  }

  async addMember(data: AddMemberDto): Promise<OrganizationMember> {
    return this.prisma.organizationMember.create({
      data: {
        organizationId: data.organizationId,
        userId: data.userId,
        role: data.role || 'MEMBER',
      },
    });
  }

  async getMemberships(userId: string): Promise<(OrganizationMember & { organization: Organization })[]> {
    return this.prisma.organizationMember.findMany({
      where: { userId },
      include: { organization: true },
    });
  }

  async isMember(userId: string, organizationId: string): Promise<boolean> {
    const member = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });
    return !!member;
  }
}

export const organizationRepository = new OrganizationRepository();
