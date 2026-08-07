import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterRequest, LoginRequest, AuthTokens } from './auth.types.js';
import { userService } from '../user/user.service.js';
import { organizationService } from '../organization/organization.service.js';
import { UserDto } from '../user/user.types.js';

export class AuthService {
  private get jwtSecret() {
    return process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';
  }

  private get jwtRefreshSecret() {
    return process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_do_not_use_in_prod';
  }

  async register(data: RegisterRequest): Promise<{ user: UserDto; tokens: AuthTokens }> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    
    // 1. Create User
    const user = await userService.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    // 2. Create personal Organization if name not provided, otherwise use provided name
    const orgName = data.organizationName || `${data.name}'s Workspace`;
    await organizationService.createOrganization({
      name: orgName,
      ownerId: user.id,
    });

    // 3. Generate tokens
    const tokens = this.generateTokens(user.id);
    
    return {
      user: userService.mapToDto(user),
      tokens,
    };
  }

  async login(data: LoginRequest): Promise<{ user: UserDto; tokens: AuthTokens }> {
    const user = await userService.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const tokens = this.generateTokens(user.id);

    return {
      user: userService.mapToDto(user),
      tokens,
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret) as { userId: string };
      return this.generateTokens(decoded.userId);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  private generateTokens(userId: string): AuthTokens {
    const accessToken = jwt.sign({ userId }, this.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, this.jwtRefreshSecret, { expiresIn: '7d' });
    
    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
