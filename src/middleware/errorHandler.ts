import { Request, Response, NextFunction } from "express";
import { AuthError } from "../utils/errors";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  // Handle custom errors
  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({
      success: false,
      error: "Authentication Error",
      message: err.message,
    });
  }
  
  // Handle Sequelize errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      error: "Duplicate Entry",
      message: "A record with this information already exists",
    });
  }
  
  // Default error response
  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: err.message,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
}; 