import { Router } from 'express';
import { linkedinController } from './linkedin.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

export const linkedinRouter = Router();

// Used in browser redirect, we pass token in URL or rely on cookie if we had one. 
// For this simple implementation, we'll use a custom middleware or just require auth for connect and status.
linkedinRouter.get('/connect', authenticateJWT, linkedinController.connect);
linkedinRouter.get('/callback', linkedinController.callback);
linkedinRouter.get('/status', authenticateJWT, linkedinController.getStatus);
