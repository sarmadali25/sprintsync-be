import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors';
import { AuthResponse, RegisterData, LoginCredentials } from '../types/auth';
import { UserHandler } from '../handlers/';
import { v4 as uuidv4 } from 'uuid';


export class AuthService {
  private static readonly JWT_SECRET = process.env['JWT_SECRET'] ?? 'your-secret-key';
  private static readonly SALT_ROUNDS = 12;

  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await UserHandler.getUserWithEmail(data.email);
      if (existingUser) {
        throw new AuthError('User with this email already exists', 400);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

      // Create user
      const userData = {
        id: uuidv4(),
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
      }

      const user = await UserHandler.createUser(userData);

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user.toJSON();
      
      return {
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Registration failed', 500);
    }
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await UserHandler.getUserWithEmail(credentials.email);
      if (!user) {
        throw new AuthError('User not found with this email', 401);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
      if (!isPasswordValid) {
        throw new AuthError('Invalid password for this email', 401);
      }

      // Generate JWT token
      const token = this.generateToken(user.id);

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user.toJSON();
      
      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Login failed', 500);
    }
  }

  static async getUserById(userId: string) {
    const user = await UserHandler.getUserWithId(userId);
    
    if (!user) {
      throw new AuthError('User not found', 404);
    }
    
    return user;
  }

  private static generateToken(userId: string): string {
    return jwt.sign(
      { userId, iat: Date.now() },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  static verifyToken(token: string): { userId: number } {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: number };
      return decoded;
    } catch (error) {
      throw new AuthError('Invalid token', 401);
    }
  }
}

 