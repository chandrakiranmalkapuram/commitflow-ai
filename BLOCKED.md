# BLOCKED.md – Phase 0 Findings

## Missing / incomplete scripts
- No `typecheck` script in root or API `package.json`.
- No `prisma generate` or `prisma migrate` scripts; generation works via binary but not as npm script.
- No `prisma migrate` script; migration reset not run (intentionally).

## Build failures
- TypeScript compilation fails (20 errors across 15 files):
  - `PORT` default type mismatch (string default for number).
  - Missing imports (`AiProvider`, `jwt`, `bcrypt`).
  - Prisma client imports failing (`PrismaClient` not exported, missing models).
  - Repository variables undefined.
- These need proper imports, type definitions, and alignment with Prisma client generation.

## Runtime / environment blockers
- `env.ts` validation throws because required vars without defaults (`DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, etc.) are undefined when running the dev server.
- `.env.example` provides placeholders, but no real `.env` is loaded; the server cannot start until a proper `.env` (or environment) supplies those values.

## Database limitations
- Prisma client generated, but no database is reachable. Running migrations or queries will fail until a Postgres instance is available and `DATABASE_URL` is set.

## Tests
- No test suites detected (`pnpm -r test` reports none). Add tests to validate critical paths.

## Next steps (Phase 1)
- Fix TypeScript type errors (import missing modules, correct `PORT` schema, align Prisma types).
- Add missing npm scripts (`typecheck`, `prisma generate`, `prisma migrate`).
- Provide a local development `.env` (or document required env vars) to allow the server to start.
- Write or enable test suites.
