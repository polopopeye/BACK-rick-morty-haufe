import { createClient } from 'redis';
import { config } from '../config';
import { info } from '../utils/messages';

export class RedisProvider {
  private readonly redisClient = createClient({
    url: config.value.redis.url,
  });
  private redisWorking: boolean;

  constructor() {
    this.redisWorking = false;

    if (config.value.redis.enabled) {
      this.redisClient.connect();
    }
    // this.redisClient.on('error', (err) => {
    //   console.log('Redis Client Error', err);
    //   this.redisWorking = false;
    // });

    this.redisClient.on('connect', () => {
      this.redisWorking = true;
    });
  }

  async get(key: string) {
    if (!this.redisWorking) return false;

    const redisValue = await this.redisClient.get(key);
    this.redisClient.quit();
    return JSON.parse(redisValue);
  }

  async update(key: string, value: any) {
    if (!this.redisWorking) return true;

    const cacheTimeOut = parseInt(config.value.redis.cacheTimeOut);
    const parsedRedisValue = JSON.stringify(value);
    await this.redisClient.setEx(key, cacheTimeOut, parsedRedisValue);
    console.log('Redis updated');
    this.redisClient.quit();
    return true;
  }

  async delete(key: string) {
    if (!this.redisWorking) return true;

    await this.redisClient.del(key);
    console.log('Redis deleted');
    this.redisClient.quit();
    return true;
  }
}
