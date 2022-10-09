import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  name: string;
  birthDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export type UpdateUser = Partial<User>;

export interface PaginationUser {
  limit: number;
  offset: number;
}

// TODO: add joi validations
