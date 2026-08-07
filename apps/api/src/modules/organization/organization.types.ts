import { Role } from '@prisma/client';

export interface OrganizationDto {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganizationDto {
  name: string;
  ownerId: string;
}

export interface AddMemberDto {
  organizationId: string;
  userId: string;
  role?: Role;
}
