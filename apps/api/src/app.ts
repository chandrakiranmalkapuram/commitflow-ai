import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';

import webhookRoute from './modules/webhook/webhook.route.js';
import { authRouter } from './modules/auth/auth.route.js';
import { githubAccountRouter } from './modules/github-account/github-account.route.js';
import { repositoryRouter } from './modules/repository/repository.route.js';
import { dashboardRouter } from './modules/dashboard/dashboard.route.js';
import { generationRouter } from './modules/generation/generation.route.js';
import { contentRouter } from './modules/content/content.route.js';
import { linkedinRouter } from './modules/linkedin/linkedin.route.js';
import { publishingRouter } from './modules/publishing/publishing.route.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());

  app.use(pinoHttp());


  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'commitflow-api',
    });
  });

  app.use(
    '/webhook',
    express.raw({ type: 'application/json' }),
    webhookRoute,
  );

  app.use('/api/auth', express.json(), authRouter);
  app.use('/api/github', express.json(), githubAccountRouter);
  app.use('/api/repositories', express.json(), repositoryRouter);
  app.use('/api/dashboard', express.json(), dashboardRouter);
  app.use('/api/generations', express.json(), generationRouter);
  app.use('/api/content', express.json(), contentRouter);
  app.use('/api/linkedin', express.json(), linkedinRouter);
  app.use('/api/publishing', express.json(), publishingRouter);

  return app;
}