import { Router } from 'express';
import { publishingController } from './publishing.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

export const publishingRouter = Router();

publishingRouter.post('/:contentId/publish', authenticateJWT, publishingController.publishContent);
