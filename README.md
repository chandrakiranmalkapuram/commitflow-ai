# CommitFlow AI

AI-powered developer content automation platform.

CommitFlow AI automatically converts your GitHub development activity into professional, engaging developer content for social platforms like LinkedIn. 

## Features

- **Automated Pipeline**: GitHub Push Webhook → AI Analysis → LinkedIn Content Generation → AI Image Generation → Background Publishing.
- **Monorepo Architecture**: Managed with Turborepo and pnpm workspaces.
- **Robust Backend**: Node.js & Express API with a PostgreSQL database and Prisma ORM.
- **Background Processing**: Redis-backed BullMQ workers handle heavy AI processing and automated publishing.
- **Modern Frontend**: React + TypeScript frontend built with Vite.
- **Secure Authentication**: JWT-based authentication flow with organization-level scoping.

## Tech Stack

- Node.js (TypeScript)
- React (Vite, TypeScript, Tailwind CSS)
- Express
- PostgreSQL (via Prisma)
- Redis (via BullMQ)
- AI Providers (e.g. Grok)

## Setup & Development

### Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL running locally
- Redis running locally

### Installation

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Ensure you have your `.env` configured for the API with database credentials, Redis URL, JWT secrets, and AI/LinkedIn API keys. 

### Running Locally

Start both the frontend and backend development servers simultaneously:

```bash
pnpm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

### Building

Build all packages and apps:

```bash
pnpm run build
```