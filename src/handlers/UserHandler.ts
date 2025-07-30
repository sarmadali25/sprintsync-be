import { User } from "../models";
import {UserAttributes} from "../types/user";

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
  }: UserAttributes) {
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
