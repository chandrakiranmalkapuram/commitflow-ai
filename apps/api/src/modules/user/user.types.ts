export interface UserDto {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
}
