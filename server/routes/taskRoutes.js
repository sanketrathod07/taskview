import express from 'express';
import { updateTask, updateTaskStatus, deleteTask, getTasksByProjectId } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .patch(updateTaskStatus);

// Fetch tasks for a specific project
router.get('/', protect, getTasksByProjectId);

export default router;