import { Router } from 'express';
import { repositoryController } from './repository.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

const router = Router();

router.use(authenticateJWT);

router.post('/', repositoryController.add);
router.get('/', repositoryController.list);
router.patch('/:id/active', repositoryController.toggleActive);

export const repositoryRouter = router;
