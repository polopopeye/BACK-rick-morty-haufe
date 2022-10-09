import mongoose, { Schema } from 'mongoose';
import { User } from '../entities/users.entities';

const collection = 'users';

const UserModel = mongoose.model<User>(
  'User',
  new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    password: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
  }),
  collection
);

export default UserModel;
