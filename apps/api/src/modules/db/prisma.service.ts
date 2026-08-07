import { PrismaClient } from '@prisma/client';

export class PrismaService {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
}

export const prismaService = new PrismaService();
