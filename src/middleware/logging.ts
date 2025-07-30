import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";

interface LogData {
  timestamp: string;
  method: string;
  path: string;
  userId?: string;
  userAgent?: string | undefined;
  ip?: string | undefined;
  statusCode: number;
  latency: number;
  error?: {
    message: string;
    stack?: string | undefined;
    name?: string | undefined;
  };
}

export const structuredLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const logData: LogData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    userAgent: req.get("User-Agent") || undefined,
    ip: req.ip || req.connection.remoteAddress || undefined,
    userId: (req as AuthenticatedRequest).user?.userId || "anonymous",
    statusCode: 0,
    latency: 0,
  };

  // Capture response data
  const originalSend = res.send;
  res.send = function (data) {
    res.send = originalSend;
    return originalSend.call(this, data);
  };

  // Log when response finishes
  res.on("finish", () => {
    logData.statusCode = res.statusCode;
    logData.latency = Date.now() - startTime;
    // Extract userId if available
  const authenticatedReq = req as AuthenticatedRequest;
  if (authenticatedReq.user?.userId) {
    logData.userId = authenticatedReq.user.userId;
  }

    // Format the log message
    const logMessage = {
      ...logData,
      latency: `${logData.latency}ms`,
    };

    // Use different log levels based on status code
    if (logData.statusCode < 400) {
      console.log("📝 API Call:", JSON.stringify(logMessage, null, 2));
    }
  });

  next();
};

export const errorLogger = (
  err: Error,
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const logData: LogData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    userAgent: req.get("User-Agent") || undefined,
    ip: req.ip || req.connection.remoteAddress || undefined,
    statusCode: 500,
    latency: 0,
    error: {
      message: err.message,
      stack: err.stack || undefined,
      name: err.name || undefined,
    },
  };

  // Extract userId if available
  const authenticatedReq = req as AuthenticatedRequest;
  if (authenticatedReq.user?.userId) {
    logData.userId = authenticatedReq.user.userId;
  }

  console.error("💥 API Error:", JSON.stringify(logData, null, 2));

  next(err);
};
