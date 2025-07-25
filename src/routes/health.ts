import { Router, Request, Response } from "express";

const router = Router();

// Basic route
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to SprintSync Backend API",
    version: "1.0.0",
    status: "running",
  });
});

// Health check endpoint
router.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.get("/status", (_req: Request, res: Response) => {
  res.json({
    message: "API is running",
    environment: process.env["NODE_ENV"] || "development",
  });
});

export default router;
