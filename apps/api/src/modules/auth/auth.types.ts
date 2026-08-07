import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  organizationName: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenSchema>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
