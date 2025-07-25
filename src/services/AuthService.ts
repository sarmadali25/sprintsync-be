import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { AuthError } from '../utils/errors';
import { AuthResponse, RegisterData, LoginCredentials } from '../types/auth';


class AuthService {
  private readonly JWT_SECRET = process.env['JWT_SECRET'] ?? 'your-secret-key';
  private readonly SALT_ROUNDS = 12;

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) {
        throw new AuthError('User with this email already exists', 400);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

      // Create user
      const user = await User.create({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
      });

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

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await User.findOne({ where: { email: credentials.email } });
      if (!user) {
        throw new AuthError('User not found', 401);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
      if (!isPasswordValid) {
        throw new AuthError('Invalid password', 401);
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

  async getUserById(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      throw new AuthError('User not found', 404);
    }
    
    return user;
  }

  private generateToken(userId: number): string {
    return jwt.sign(
      { userId, iat: Date.now() },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  verifyToken(token: string): { userId: number } {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: number };
      return decoded;
    } catch (error) {
      throw new AuthError('Invalid token', 401);
    }
  }
}

export default new AuthService();
 