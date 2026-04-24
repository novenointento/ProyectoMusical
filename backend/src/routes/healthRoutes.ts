import { Router } from 'express';
import { getExampleTask, getHealth } from '../controllers/templateController';

const router = Router();

router.get('/health', getHealth);
router.get('/api/example-task', getExampleTask);

export default router;
