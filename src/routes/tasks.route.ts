import TaskController from '../controllers/task.controller';
import express from 'express';
import { authenticateAccessToken } from '../middleware/users/users.access';
import ValidSchema from '../middleware/tasks/task.validation';

const router = express.Router();

// Apply middleware to routes that require authentication
router.post('/add-task', authenticateAccessToken,ValidSchema.validateTaskCreation, TaskController.addTask);
router.post('/get-tasks', authenticateAccessToken,ValidSchema.validateGetTask, TaskController.getTask);
router.post('/delete-task', authenticateAccessToken,ValidSchema.validateDeleteTask, TaskController.deleteTask);
router.put('/edit-task', authenticateAccessToken,ValidSchema.validateUpdateTask, TaskController.updateTask);
router.put('/star-task', authenticateAccessToken,ValidSchema.validateStarTask, TaskController.starredTask);
router.put('/complete-task', authenticateAccessToken,ValidSchema.validateComplte, TaskController.completedTask);
router.post('/completed-tasks', authenticateAccessToken, ValidSchema.validateCompletedTask,TaskController.getCompletedTask);

export default router;
