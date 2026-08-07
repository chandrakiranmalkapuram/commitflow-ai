import { Router } from 'express';
import { publishingController } from './publishing.controller.js';
import { requireAuth } from '../auth/auth.middleware.js';

export const publishingRouter = Router();

publishingRouter.post('/:contentId/publish', requireAuth, publishingController.publishContent);
