import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string().min(1).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
//   TODO: update password validation
});

const validateLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details?.[0]?.message,
    });
  }

  next();
};

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
    "string.empty": "First name cannot be empty",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
    "string.empty": "Last name cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  }),
//   TODO: update password validation
  password: Joi.string().min(1).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
//   TODO: update phone number validation
  phoneNumber: Joi.string().min(8).required().messages({
    "string.min": "Phone number must be at least 8 characters long",
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty",
  }),
});

const validateRegister = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details?.[0]?.message,
    });
  }

  next();
};

export { validateLogin, validateRegister }
