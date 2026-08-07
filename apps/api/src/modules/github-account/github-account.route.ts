import { Router } from 'express';
import { githubAccountController } from './github-account.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

const router = Router();

router.use(authenticateJWT);

router.post('/connect', githubAccountController.connect);
router.get('/me', githubAccountController.getMyAccount);
router.get('/callback', githubAccountController.handleCallback);

export const githubAccountRouter = router;
