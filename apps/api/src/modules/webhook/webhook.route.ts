import { Router } from 'express';

import { receiveGithubWebhook } from './webhook.controller.js';

const router = Router();

router.post(
    '/github',
    receiveGithubWebhook,
);

export default router;