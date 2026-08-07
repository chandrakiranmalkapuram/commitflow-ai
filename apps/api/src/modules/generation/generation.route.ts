import { Router } from 'express';
import { generationController } from './generation.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

const router = Router();

router.use(authenticateJWT);
router.get('/', generationController.listGenerations.bind(generationController));
router.get('/:id', generationController.getGeneration.bind(generationController));
router.get('/:id/content', generationController.getGenerationContent.bind(generationController));

export const generationRouter = router;
