import axios from 'axios';
import db from '../../database/database.module';
import { RedisProvider } from '../../redis/redis.provider';
import { info } from '../../utils/messages';

export class CharacterService {
  constructor(
    private redisClient = new RedisProvider(),
    private axiosCall = axios
  ) {
    db;
  }

  async findOne(id: string) {
    // single id or id separated by comma
    const apiUrl = 'https://rickandmortyapi.com/api/character/' + id;
    const tableName = 'rickAndMorty/Character' + id;

    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const apiData = await this.axiosCall.get(apiUrl);
      if (apiData) {
        this.redisClient.update(tableName, apiData.data);
        console.log(info.database.served);
        return apiData.data;
      } else {
        return false;
      }
    } else {
      console.log(info.redis.served);
      return redisData;
    }
  }

  async findAll(page = 1) {
    const apiUrl = 'https://rickandmortyapi.com/api/character/?page=' + page;
    const tableName = 'rickAndMorty/allCharacters' + page;

    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const apiData = await this.axiosCall.get(apiUrl);
      if (apiData) {
        this.redisClient.update(tableName, apiData.data);
        console.log(info.database.served);
        return apiData.data;
      } else {
        return false;
      }
    } else {
      console.log(info.redis.served);
      return redisData;
    }
  }

  async filterCharacter(params: string) {
    const apiUrl = 'https://rickandmortyapi.com/api/character/?' + params;
    const tableName = 'rickAndMorty/filterCharacter' + params;

    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const apiData = await this.axiosCall.get(apiUrl);
      if (apiData) {
        this.redisClient.update(tableName, apiData.data);
        console.log(info.database.served);
        return apiData.data;
      } else {
        return false;
      }
    } else {
      console.log(info.redis.served);
      return redisData;
    }
  }
}
