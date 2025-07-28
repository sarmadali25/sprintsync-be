import { User } from "../models";

export class UserHandler {
  static async getUserWithEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async getUserWithId(id: number, exclude: string[] = ["password"]) {
    const user = await User.findByPk(id, { attributes: { exclude } });
    return user;
  }

  static async createUser({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    return user;
  }
}
