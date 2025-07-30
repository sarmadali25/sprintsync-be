import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<Response |void> {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password, firstName, lastName, phoneNumber } = req.body;

      const result = await AuthService.register({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = await AuthService.getUserById(req.user?.userId!);
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await AuthService.getAllUsers();
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}
