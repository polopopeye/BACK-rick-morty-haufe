import { createClient } from 'redis';
import { config } from '../config';

export class RedisProvider {
  private readonly redisClient = createClient({
    url: config.value.redis.url,
  });

  constructor() {
    this.redisClient.connect();
    this.redisClient.on('error', (err) =>
      console.log('Redis Client Error', err)
    );
    this.redisClient.on('connect', () => console.log('Redis Client Connected'));
  }

  async get(key: string) {
    const redisValue = await this.redisClient.get(key);
    return JSON.parse(redisValue);
  }

  async update(key: string, value: any) {
    const cacheTimeOut = parseInt(config.value.redis.cacheTimeOut);
    const parsedRedisValue = JSON.stringify(value);
    await this.redisClient.setEx(key, cacheTimeOut, parsedRedisValue);
    console.log('Redis updated');
    return true;
  }

  async delete(key: string) {
    await this.redisClient.del(key);
    console.log('Redis deleted');
    return true;
  }
}
