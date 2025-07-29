import { Request, Response, NextFunction } from 'express';
import {AuthService} from '../services';
import { AuthError } from '../utils/errors';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AuthError('Access token required', 401);
    }

    const decoded = AuthService.verifyToken(token);
    req.user = { userId: decoded.userId.toString() };
    
    next();
  } catch (error) {
    next(error);
  }
};

export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AuthError('Access token required', 401);
    }

    const decoded = AuthService.verifyToken(token);
    if (!decoded.isAdmin) {
      throw new AuthError('Unauthorized', 403);
    }
    req.user = { userId: decoded.userId.toString() };
    
    
    next();
  } catch (error) {
    next(error);
  }
};
