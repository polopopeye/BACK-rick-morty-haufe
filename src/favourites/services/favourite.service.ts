import db from '../../database/database.module';
import { RedisProvider } from '../../redis/redis.provider';
import { info } from '../../utils/messages';
import FavouriteModel from '../dtos/favourite.dtos';
import { Favourite, UpdateFavourite } from '../entities/favourite.entities';

export class FavouriteService {
  constructor(
    private redisClient = new RedisProvider(),
    private favouriteRepository = FavouriteModel
  ) {
    db;
  }

  async findOne(userId: string, characterId: string) {
    const tableName = this.favouriteRepository.collection.collectionName + id;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.favouriteRepository.findOne({
        userId,
        characterId,
      });
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

  async create(data: Favourite) {
    const favourite = new FavouriteModel({
      ...data,
    });

    const { userId, characterId } = data;

    const findFavourite = await this.favouriteRepository.findOne({
      userId,
      characterId,
    });
    if (findFavourite) return false;

    const newUser = this.favouriteRepository.create(favourite);
    const tableName = this.favouriteRepository.collection.collectionName;
    this.redisClient.delete(tableName);

    return newUser;
  }

  async update(userId: string, characterId: string, data: UpdateFavourite) {
    const favourite = await this.favouriteRepository.findOne({
      userId,
      characterId,
    });
    if (!favourite) return false;
    this.favouriteRepository.updateOne({ userId, characterId }, data);
    return favourite;
  }

  async remove(userId: string, characterId: string) {
    const favourite = await this.favouriteRepository.findOne({
      userId,
      characterId,
    });
    if (!favourite) return false;
    return this.favouriteRepository.deleteOne({ userId, characterId });
  }
}
