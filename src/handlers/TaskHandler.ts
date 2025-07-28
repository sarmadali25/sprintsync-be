import { Task } from "../models";
import { TaskAttributes, TaskUpdateAttributes } from "../types/task";

export class TaskHandler {
  static async getAllTasks() {
    const tasks = await Task.findAll();
    return tasks;
  }

  static async getTaskById(id: string) {
    const task = await Task.findByPk(id);
    return task;
  }

  static async createTask(task: TaskAttributes) {
    const newTask = await Task.create(task);
    return newTask;
  }

  static async updateTask(id: string, task: TaskUpdateAttributes) {
    const updatedTask = await Task.update(task, {
      where: { id },
      returning: true,
    });
    return updatedTask?.[1]?.[0];
  }

  static async deleteTask(id: string) {
    await Task.destroy({ where: { id } });
  }
}
