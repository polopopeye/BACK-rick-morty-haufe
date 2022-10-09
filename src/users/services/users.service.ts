import db from '../../database/database.module';
import { RedisProvider } from '../../redis/redis.provider';
import UserModel from '../dtos/users.dtos';
import { PaginationUser, UpdateUser, User } from '../entities/users.entities';

export class UserService {
  constructor(
    private redisClient = new RedisProvider(),
    private database = db,
    private userRepository = UserModel
  ) {}

  async findAll(params: PaginationUser) {
    const { limit = 100, offset = 0 } = params;
    const tableName = this.userRepository.collection.collectionName;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.userRepository.find({
        order: {
          companyName: 'DESC',
        },
        skip: offset,
        take: limit,
      });
      if (dbData) this.redisClient.update(tableName, dbData);
      console.log('served from db');
      return dbData;
    }

    console.log('served from redis');
    return redisData;
  }

  async findOne(id: string) {
    const tableName = this.userRepository.collection.collectionName + id;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.userRepository.findOne({ _id: id });
      if (dbData) this.redisClient.update(tableName, dbData);
      console.log('served from db');
      return dbData;
    }

    console.log('served from redis');
    return redisData;
  }

  create(data: User) {
    const newUser = this.userRepository.create(data);
    const tableName = this.userRepository.collection.collectionName;
    this.redisClient.delete(tableName);

    return newUser;
  }

  async update(id: string, changes: UpdateUser) {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) return false;
    this.userRepository.updateOne({ _id: id }, changes);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) return false;
    return this.userRepository.deleteOne({ _id: id });
  }
}
