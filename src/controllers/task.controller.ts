import { Request, Response } from "express";
import { internalServerError } from "../helpers/responseFormate";
import TaskService from "../services/task.services";
// Import your user model

// Define a custom Request interface that extends Express's Request interface

class TaskController {
  async addTask(req: Request, res: Response): Promise<void> {
    try {
      // Now 'user' property will be available on req object
      const { id, title, description, priority, dueDate, category } = req.body;
      let userId = id;
      if (!userId) {
        res.json("User id not available");
      }
      const task = await TaskService.addTask(
        userId,
        title,
        description,
        priority,
        dueDate,
        category
      );
      res.json(task);
    } catch (error) {
      res.json(internalServerError);
    }
  }

  async getTask(req: Request, res: Response): Promise<void> {
    try {
      const { userId, starred } = req.body;
      if (!starred) {
        const tasks = await TaskService.getTasksByUserId(userId);
        res.json(tasks);
      }

      if (starred) {
        const starredTasks = await TaskService.getStarredTasksByUserId(
          userId,
          starred
        );
        res.json(starredTasks);
      }
    } catch (error) {
      res.json(internalServerError);
    }
  }

  async getCompletedTask(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      const completedTask = await TaskService.getCopletedTask(userId);
      res.json(completedTask);
    } catch (error) {
      res.json(internalServerError);
    }
  }
  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { userId, taskId } = req.body;
      console.log(typeof userId);
      console.log(typeof taskId);
      // Simulate a 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const tasks = await TaskService.deleteTask(userId, taskId);
      res.json(tasks);
    } catch (error) {
      res.json(internalServerError);
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { user, taskId, title, description, priority, dueDate, category } =
        req.body;
      const task = await TaskService.editTask(
        user,
        taskId,
        title,
        description,
        priority,
        dueDate,
        category
      );
      res.json(task);
    } catch (error) {
      res.json(internalServerError);
    }
  }
  async starredTask(req: Request, res: Response): Promise<void> {
    try {
      const { user, taskId, star } = req.body;
      console.log(typeof user);
      console.log(typeof taskId);
      console.log(typeof star);
      const task = await TaskService.starredTask(user, taskId, star);
      res.json(task);
    } catch (error) {
      res.json(internalServerError);
    }
  }
  async completedTask(req: Request, res: Response): Promise<void> {
    try {
      const { user, taskId } = req.body;
      console.log(req.body);
      const task = await TaskService.completedTask(user, taskId);
      res.json(task);
    } catch (error) {
      res.json(internalServerError);
    }
  }
}

export default new TaskController();
