import { Router } from 'express';
import { getAllJobs, getJobById, applyForJob } from '../controllers/jobController';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', upload.single('resume'), applyForJob);

export default router;