import { Task, User } from "../models";
import { TaskAttributes, TaskUpdateAttributes } from "../types/task";

export class TaskHandler {
  static include = [
    {
      model: User,
      as: 'assignedTo', 
      attributes: ['id', 'firstName', 'lastName', 'email'] 
    },
    {
      model: User,
      as: 'owner', 
      attributes: ['id', 'firstName', 'lastName', 'email'] 
    }
  ]

  static async getAllTasks() : Promise<TaskAttributes[]> {
    const tasks = await Task.findAll({
      include: this.include,
      order: [['createdAt', 'DESC']]
    });
    return tasks;
  }

  static async getTaskById(id: string) : Promise<TaskAttributes | null> {
    const task = await Task.findByPk(id, {
      include: this.include
    });
    return task;
  }

  static async createTask(task: TaskAttributes) : Promise<TaskAttributes> {
    const newTask = await Task.create(task);
    return newTask;
  }

  static async updateTask(id: string, task: TaskUpdateAttributes) : Promise<TaskAttributes | null | undefined> {
    const updatedTask = await Task.update(task, {
      where: { id },
      returning: true,
    });
    return updatedTask?.[1]?.[0];
  }

  static async deleteTask(id: string) : Promise<void> {
    await Task.destroy({ where: { id } });
  }
}
