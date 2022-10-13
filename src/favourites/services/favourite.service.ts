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
    const tableName =
      this.favouriteRepository.collection.collectionName + userId + characterId;
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
    console.log(`fastlog => data`, data);
    const favourite = new FavouriteModel({
      ...data,
    });

    const { userId, characterId } = data;

    const findFavourite = await this.favouriteRepository.findOne({
      userId,
      characterId,
    });
    console.log(`fastlog => findFavourite`, findFavourite);
    if (findFavourite) return false;

    const newFavourite = this.favouriteRepository.create(favourite);
    const tableName = this.favouriteRepository.collection.collectionName;
    this.redisClient.delete(tableName);

    return newFavourite;
  }

  async update(userId: string, characterId: string, data: UpdateFavourite) {
    const favourite = await this.favouriteRepository.findOne({
      userId,
      characterId,
    });
    if (!favourite) return false;
    const updatedFav = await this.favouriteRepository.updateOne(
      { userId, characterId },
      data
    );
    return updatedFav;
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
