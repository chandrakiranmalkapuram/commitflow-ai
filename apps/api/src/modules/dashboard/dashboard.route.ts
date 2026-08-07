import { Router } from 'express';
import { dashboardController } from './dashboard.controller.js';
import { authenticateJWT } from '../auth/auth.middleware.js';

const router = Router();

router.use(authenticateJWT);
router.get('/', dashboardController.getDashboardStats.bind(dashboardController));

export const dashboardRouter = router;
