"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisProvider = void 0;
const redis_1 = require("redis");
const config_1 = require("../config");
class RedisProvider {
    constructor() {
        this.redisClient = (0, redis_1.createClient)({
            url: config_1.config.value.redis.url,
        });
        this.redisWorking = false;
        if (config_1.config.value.redis.enabled) {
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
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.redisWorking)
                return false;
            const redisValue = yield this.redisClient.get(key);
            this.redisClient.quit();
            return JSON.parse(redisValue);
        });
    }
    update(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.redisWorking)
                return true;
            const cacheTimeOut = parseInt(config_1.config.value.redis.cacheTimeOut);
            const parsedRedisValue = JSON.stringify(value);
            yield this.redisClient.setEx(key, cacheTimeOut, parsedRedisValue);
            console.log('Redis updated');
            this.redisClient.quit();
            return true;
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.redisWorking)
                return true;
            yield this.redisClient.del(key);
            console.log('Redis deleted');
            this.redisClient.quit();
            return true;
        });
    }
}
exports.RedisProvider = RedisProvider;
//# sourceMappingURL=redis.provider.js.map