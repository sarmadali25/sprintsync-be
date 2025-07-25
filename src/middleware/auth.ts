import { Request, Response, NextFunction } from 'express';
import {AuthService} from '../services';
import { AuthError } from '../utils/errors';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AuthError('Access token required', 401);
    }

    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    next(error);
  }
};
