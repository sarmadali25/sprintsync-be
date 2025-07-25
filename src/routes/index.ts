import { Router, Request, Response, NextFunction } from "express";

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
router.get("/api/status", (_req: Request, res: Response) => {
  res.json({
    message: "API is running",
    environment: process.env["NODE_ENV"] || "development",
  });
});

// Error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
router.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

router.get("/", (_req, res) => {
  res.send("Hello World");
});

export default router;
