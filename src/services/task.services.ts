import Task, { ITask } from "../models/task.model";
import { handleResponse } from "../helpers/responseFormate";
import { ResponseCodes } from "../utils/responseCodes";
import { ResponseMessages } from "../utils/responseMessages";
import { generateRandomTaskId } from "../utils/IdGenerators";

class TaskService {
  async addTask(
    userId: number,
    title: string,
    description: string,
    priority: string,
    dueDate: Date,
    category: string
  ) {
    try {
      // Convert title and priority to lowercase
      const lowercaseTitle = title.toLowerCase();
      const lowercasePriority = priority.toLowerCase();

      // Check if a task with the same title already exists for the current user
      const existingTask = await Task.findOne({
        title: lowercaseTitle,
        user: userId,
      });
      if (existingTask) {
        return handleResponse(
          ResponseCodes.itemAlredyExist,
          ResponseMessages.TaskAlredyExist
        );
      }

      // Generate a unique task ID
      let taskId = generateRandomTaskId();
      let taskCreationDate = new Date();
      // Ensure that the generated task ID is unique
      while (await Task.exists({ taskId })) {
        taskId = generateRandomTaskId();
      }
      // Create a new task and associate it with the current user
      const newTask: ITask = new Task({
        title: lowercaseTitle,
        description,
        priority: lowercasePriority,
        createDate: taskCreationDate,
        dueDate,
        category: category.toLowerCase(),
        user: userId,
        taskId,
      });

      // Save the task
      await newTask.save();

      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.taskAdded,
        newTask
      );
    } catch (error) {
      return error;
    }
  }

  async getTasksByUserId(userId: number) {
    try {
      const tasks = await Task.find({ user: userId, status: false });
      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.tasksFetched,
        tasks
      );
    } catch (error) {
      throw new Error("Failed to fetch tasks: " + error);
    }
  }
  async getStarredTasksByUserId(userId: number, starred: boolean) {
    try {
      const tasks = await Task.find({
        user: userId,
        starred: starred,
        status: false,
      });
      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.starredTasksFetched,
        tasks
      );
    } catch (error) {
      throw new Error("Failed to fetch starred tasks: " + error);
    }
  }
  async getCopletedTask(userId: number) {
    try {
      const tasks = await Task.find({
        user: userId,
        status: true,
      });
      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.starredTasksFetched,
        tasks
      );
    } catch (error) {
      throw new Error("Failed to fetch starred tasks: " + error);
    }
  }

  async deleteTask(userId: number, taskId: string) {
    try {
      // Find the task by taskId and userId
      const task = await Task.findOne({ taskId, user: userId });

      // If task not found, return an error response
      if (!task) {
        return handleResponse(
          ResponseCodes.notFound,
          ResponseMessages.taskNotFound
        );
      }

      // Delete the task
      await Task.deleteOne({ taskId, user: userId });

      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.taskDeleted
      );
    } catch (error) {
      throw new Error("Failed to delete task: " + error);
    }
  }
  async editTask(
    user: number,
    taskId: string,
    title: string,
    description: string,
    priority: any,
    dueDate: Date,
    category: string
  ) {
    try {
      // Convert title and priority to lowercase
      const lowercaseTitle = title.toLowerCase();
      const lowercasePriority = priority.toLowerCase();
      const checkExistingTask = await Task.find({
        user,
        title: lowercaseTitle,
      });
      if (checkExistingTask) {
        return handleResponse(
          ResponseCodes.itemAlredyExist,
          ResponseMessages.TaskAlredyExist
        );
      }

      // Find the task by taskId and userId
      const task = await Task.findOne({ taskId, user });

      // If task not found, return an error response
      if (!task) {
        return handleResponse(
          ResponseCodes.notFound,
          ResponseMessages.taskNotFound
        );
      }

      // Update task properties
      task.title = lowercaseTitle;
      task.description = description;
      task.priority = lowercasePriority;
      task.dueDate = dueDate;
      task.category = category.toLowerCase();

      // Save the updated task
      await task.save();

      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.taskUpdated,
        task
      );
    } catch (error) {
      throw new Error("Failed to edit task: " + error);
    }
  }
  async starredTask(userId: number, taskId: number, star: boolean) {
    try {
      const task = await Task.findOne({ taskId, user: userId });
      if (!task) {
        return handleResponse(
          ResponseCodes.notFound,
          ResponseMessages.taskNotFound
        );
      }
      task.starred = star;
      await task.save();
      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.taskStarred,
        task
      );
    } catch (error) {
      return error;
    }
  }
  async completedTask(userId: number, taskId: number) {
    try {
      const task = await Task.findOne({ taskId, user: userId });
      if (!task) {
        return handleResponse(
          ResponseCodes.notFound,
          ResponseMessages.taskNotFound
        );
      }
      task.status = true;
      const currentDate = new Date();
      task.completedDate = currentDate;
      // task.dueDate=null
      await task.save();
      return handleResponse(
        ResponseCodes.success,
        ResponseMessages.taskCopleted,
        task
      );
    } catch (error) {
      return error;
    }
  }
}

export default new TaskService();
