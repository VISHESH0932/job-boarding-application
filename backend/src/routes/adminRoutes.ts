import { Router } from 'express';
import { createJob, getApplications, login, updateApplicationStatus } from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware'
const router = Router();

router.post('/login', login);
router.post('/jobs', authMiddleware, createJob);
router.get('/applications', authMiddleware, getApplications);
router.patch('/applications/:id/status', authMiddleware, updateApplicationStatus);

export default router;