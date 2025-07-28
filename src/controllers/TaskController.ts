import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

export class TaskController {
  static async getAllTasks(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const tasks = await TaskService.getAllTasks();
      return res.status(200).json({
        message: "Tasks fetched successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const taskId = req.params?.["id"];
      if (!taskId) {
        return res.status(400).json({
          message: "Task ID is required",
        });
      }
      const task = await TaskService.getTaskById(taskId);
      return res.status(200).json({
        message: "Task fetched successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createTask(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { title, description, status, assignedToId, ownerId } = req.body;
      
      const task = await TaskService.createTask({
        title,
        description,
        status,
        assignedToId,
        ownerId,
      });
      return res.status(201).json({
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const taskId = req.params?.["id"];
      if (!taskId) {
        return res.status(400).json({
          message: "Task ID is required",
        });
      }
      
      // Only include fields that are actually provided in the request
      const updateData: any = {};
      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (req.body.status !== undefined) updateData.status = req.body.status;
      if (req.body.assignedToId !== undefined) updateData.assignedToId = req.body.assignedToId;
      if (req.body.ownerId !== undefined) updateData.ownerId = req.body.ownerId;
      
      const task = await TaskService.updateTask(taskId, updateData);
      return res.status(201).json({
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const taskId = req.params?.["id"];
      if (!taskId) {
        return res.status(400).json({
          message: "Task ID is required",
        });
      }
      await TaskService.deleteTask(taskId);
      return res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
