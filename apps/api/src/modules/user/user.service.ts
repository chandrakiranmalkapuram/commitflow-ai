import { userRepository } from './user.repository.js';
import { CreateUserDto, UserDto } from './user.types.js';
import { User } from '@prisma/client';

export class UserService {
  async createUser(data: CreateUserDto): Promise<User> {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('User already exists');
    }
    return userRepository.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return userRepository.findById(id);
  }

  mapToDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export const userService = new UserService();
