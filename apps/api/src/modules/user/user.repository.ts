import { prismaService } from '../db/prisma.service.js';
import { CreateUserDto } from './user.types.js';
import { User } from '@prisma/client';

export class UserRepository {
  private get prisma() {
    return prismaService.client;
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

export const userRepository = new UserRepository();
