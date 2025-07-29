import { User } from "../models";

export class UserHandler {
  static async getUserWithEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async getUserWithId(id: string, exclude: string[] = ["password"]) {
    const user = await User.findByPk(id, { attributes: { exclude } });
    return user;
  }

  static async createUser({
    id,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) {
    const user = await User.create({
      id,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      
    });
    return user;
  }

  static async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}
