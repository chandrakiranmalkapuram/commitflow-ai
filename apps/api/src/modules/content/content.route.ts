import { Router } from 'express';
import { contentController } from './content.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

const router = Router();

router.use(authenticateJWT);
router.post('/:id/approve', contentController.approveContent.bind(contentController));
router.post('/:id/reject', contentController.rejectContent.bind(contentController));

export const contentRouter = router;
