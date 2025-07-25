import { Request, Response, NextFunction } from 'express';
import {AuthService} from '../services';

export const loginController = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const result = await AuthService.login({ email, password });
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const registerController = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    
    const result = await AuthService.register({
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    });
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
