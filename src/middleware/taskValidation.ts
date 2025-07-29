import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().min(5).max(50).required().messages({
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title cannot exceed 50 characters",
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().min(10).required().messages({
    "string.min": "Description must be at least 10 characters long",
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  status: Joi.string().valid("pending", "in_progress", "completed").default("pending").messages({
    "any.required": "Status is required",
    "string.empty": "Status cannot be empty",
    "any.only": "Status must be either pending, in_progress, or completed",
  }),
  assignedToId: Joi.string().uuid().required().messages({
    "any.required": "Assigned to ID is required",
    "string.uuid": "Assigned to ID must be a valid UUID",
  }),
  ownerId: Joi.string().uuid().required().messages({
    "any.required": "Owner ID is required",
    "string.uuid": "Owner ID must be a valid UUID",
  }),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(5).max(50).optional().messages({
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title cannot exceed 50 characters",
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().min(10).optional().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.empty": "Description cannot be empty",
  }),
  status: Joi.string().valid("pending", "in_progress", "completed").optional().messages({
    "string.empty": "Status cannot be empty",
    "any.only": "Status must be either pending, in_progress, or completed",
  }),
  assignedToId: Joi.string().uuid().optional().messages({
    "string.uuid": "Assigned to ID must be a valid UUID",
  }),
  ownerId: Joi.string().uuid().optional().messages({
    "string.uuid": "Owner ID must be a valid UUID",
  }),
});

const updateTaskStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "in_progress", "completed").required().messages({
    "any.required": "Status is required",
    "string.empty": "Status cannot be empty",
    "any.only": "Status must be either pending, in_progress, or completed",
  }),
});

const validateTask = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      message: error.details?.[0]?.message,
    });
  }

  next();
};

const validateUpdateTask = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = updateTaskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      message: error.details?.[0]?.message,
    });
  }

  next();
};

const validateUpdateTaskStatus = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = updateTaskStatusSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      message: error.details?.[0]?.message,
    });
  }

  next();
};

export { validateTask, validateUpdateTask, validateUpdateTaskStatus };