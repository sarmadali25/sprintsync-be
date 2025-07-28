import { v4 as uuidv4 } from 'uuid';

import { TaskHandler } from "../handlers";
import { TaskError } from "../utils/errors";
import { TaskAttributes, TaskUpdateAttributes } from "../types/task";

export class TaskService {
  static async getAllTasks() {
    try {
      const tasks = await TaskHandler.getAllTasks();
      return tasks;
    } catch (error) {
      if (error instanceof TaskError) {
        throw error;
      }
      throw new TaskError("Failed to fetch tasks", 500);
    }
  }

  static async getTaskById(id: string) {
    try {
      const task = await TaskHandler.getTaskById(id);
      if (!task) {
        throw new TaskError("Task not found with this id", 404);
      }
      return task;
    } catch (error) {
      if (error instanceof TaskError) {
        throw error;
      }
      throw new TaskError("Failed to fetch task by id", 500);
    }
  }

  static async createTask(task: TaskAttributes) {
    try {
      const newTask = await TaskHandler.createTask({
        id: uuidv4(),
        title: task.title,
        description: task.description,
        status: task.status,
        assignedToId: task.assignedToId,
        ownerId: task.ownerId,
      });
      return newTask;
    } catch (error) {
      console.log(error);
      if (error instanceof TaskError) {
        throw error;
      }
      throw new TaskError("Failed to create task",500);
    }
  }

  static async updateTask(id: string, task: TaskUpdateAttributes) {
    try {
      const taskToUpdate = await TaskHandler.getTaskById(id);
      if (!taskToUpdate) {
        throw new TaskError("Task not found with this id", 404);
      }
      const updatedTask = await TaskHandler.updateTask(id, task);
      if (!updatedTask) {
        throw new TaskError("Failed to update task", 500);
      }
      return updatedTask;
    } catch (error) {
      if (error instanceof TaskError) {
        throw error;
      }
      throw new TaskError("Failed to update task",500);
    }
  }

  static async deleteTask(id: string) {
    try {
      const taskToDelete = await TaskHandler.getTaskById(id);
      if (!taskToDelete) {
        throw new TaskError("Task not found with this id", 404);
      }
      await TaskHandler.deleteTask(id);
    } catch (error) {
      if (error instanceof TaskError) {
        throw error;
      }
      throw new TaskError("Failed to delete task", 500);
    }
  }
}
