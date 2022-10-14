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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteService = void 0;
const database_module_1 = __importDefault(require("../../database/database.module"));
const redis_provider_1 = require("../../redis/redis.provider");
const messages_1 = require("../../utils/messages");
const favourite_dtos_1 = __importDefault(require("../dtos/favourite.dtos"));
class FavouriteService {
    constructor(redisClient = new redis_provider_1.RedisProvider(), favouriteRepository = favourite_dtos_1.default) {
        this.redisClient = redisClient;
        this.favouriteRepository = favouriteRepository;
        database_module_1.default;
    }
    findOne(userId, characterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.favouriteRepository.collection.collectionName + userId + characterId;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const dbData = yield this.favouriteRepository.findOne({
                    userId,
                    characterId,
                });
                if (dbData) {
                    this.redisClient.update(tableName, dbData);
                    console.log(messages_1.info.database.served);
                    return dbData;
                }
                else {
                    return false;
                }
            }
            else {
                console.log(messages_1.info.redis.served);
                return redisData;
            }
        });
    }
    findUsersFav(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.favouriteRepository.collection.collectionName + userId;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const dbData = yield this.favouriteRepository.find({ userId });
                if (dbData) {
                    this.redisClient.update(tableName, dbData);
                    console.log(messages_1.info.database.served);
                    return dbData;
                }
                else {
                    return false;
                }
            }
            else {
                console.log(messages_1.info.redis.served);
                return redisData;
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`fastlog => data`, data);
            const favourite = new favourite_dtos_1.default(Object.assign({}, data));
            const { userId, characterId } = data;
            const findFavourite = yield this.favouriteRepository.findOne({
                userId,
                characterId,
            });
            console.log(`fastlog => findFavourite`, findFavourite);
            if (findFavourite)
                return false;
            const newFavourite = this.favouriteRepository.create(favourite);
            const tableName = this.favouriteRepository.collection.collectionName;
            this.redisClient.delete(tableName);
            return newFavourite;
        });
    }
    update(userId, characterId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const favourite = yield this.favouriteRepository.findOne({
                userId,
                characterId,
            });
            if (!favourite)
                return false;
            const updatedFav = yield this.favouriteRepository.updateOne({ userId, characterId }, data);
            return updatedFav;
        });
    }
    remove(userId, characterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favourite = yield this.favouriteRepository.findOne({
                userId,
                characterId,
            });
            if (!favourite)
                return false;
            return this.favouriteRepository.deleteOne({ userId, characterId });
        });
    }
}
exports.FavouriteService = FavouriteService;
//# sourceMappingURL=favourite.service.js.map