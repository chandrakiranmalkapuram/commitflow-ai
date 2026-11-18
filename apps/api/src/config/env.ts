import { z } from 'zod';

// Define the schema for required environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default(4000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string(), // keep as string, used elsewhere
  JWT_REFRESH_TTL: z.string(),
  GITHUB_WEBHOOK_SECRET: z.string().min(16),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  TOKEN_ENCRYPTION_KEY: z.string().length(64).regex(/^[0-9a-fA-F]+$/),
  CORS_ORIGINS: z.string(),
  OPENAI_API_KEY: z.string().optional(),
  WORKER_CONCURRENCY: z.string().optional().transform(val => (val ? Number(val) : 3)),
  WORKER_RATE_MAX: z.string().optional().transform(val => (val ? Number(val) : 10)),
});

export const env = envSchema.parse(process.env);
