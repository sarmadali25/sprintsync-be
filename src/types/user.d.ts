export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
