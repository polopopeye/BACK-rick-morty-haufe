import { Document } from 'mongoose';

/**
 * @openapi
 * components:
 *    schemas:
 *     User:
 *      type: object
 *      properties:
 *       name:
 *        type: string
 *        description: Name of the user
 *        example: John Doe
 *       email:
 *        type: string
 *        format: email
 *        description: Email of the user
 *        example: test@test.com
 *       birthDate:
 *        type: string
 *        format: date
 *        description: Birthdate of the user
 *        example: 1990-01-01
 *       password:
 *        type: string
 *        format: password
 *        description: Password of the user
 *        example: 123456
 */
export interface User extends Document {
  email: string;
  name: string;
  birthDate: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateUser = Partial<User>;

export interface PaginationUser {
  limit: number;
  offset: number;
}

// TODO: add joi validations
