import db from '../../database/database.module';
import { RedisProvider } from '../../redis/redis.provider';
import { errors, info } from '../../utils/messages';
import UserModel from '../dtos/users.dtos';
import {
  LoginUser,
  PaginationUser,
  UpdateUser,
  User,
} from '../entities/users.entities';

export class UserService {
  constructor(
    private redisClient = new RedisProvider(),
    private userRepository = UserModel
  ) {
    db;
  }

  async findAll(params: PaginationUser) {
    if (!params.limit || !params.offset) {
      throw new Error(errors.common.params);
    }

    const { limit, offset } = params;
    const tableName = this.userRepository.collection.collectionName;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.userRepository
        .find({})
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });

      if (dbData) this.redisClient.update(tableName, dbData);
      console.log(info.database.served);
      return dbData;
    }

    console.log(info.redis.served);
    return redisData;
  }

  async findOne(id: string) {
    const tableName = this.userRepository.collection.collectionName + id;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.userRepository.findOne({ _id: id });
      if (dbData) {
        this.redisClient.update(tableName, dbData);
        console.log(info.database.served);
        return dbData;
      } else {
        return false;
      }
    } else {
      console.log(info.redis.served);
      return redisData;
    }
  }

  async create(data: User) {
    const user = new UserModel({
      ...data,
    });

    const findUser = await this.userRepository.findOne({ email: data.email });
    if (findUser) return false;

    const newUser = this.userRepository.create(user);
    const tableName = this.userRepository.collection.collectionName;
    this.redisClient.delete(tableName);

    return newUser;
  }

  async update(id: string, changes: UpdateUser) {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) return false;
    const updatedUser = await this.userRepository.updateOne(
      { _id: id },
      changes
    );
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) return false;
    return this.userRepository.deleteOne({ _id: id });
  }

  async login({ email, password }: LoginUser) {
    const user = await this.userRepository.findOne({ email, password });
    if (!user) return false;
    return user;
  }

  async checkEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) return false;
    return user;
  }
}
