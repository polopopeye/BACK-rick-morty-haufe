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
exports.UserService = void 0;
const database_module_1 = __importDefault(require("../../database/database.module"));
const redis_provider_1 = require("../../redis/redis.provider");
const messages_1 = require("../../utils/messages");
const users_dtos_1 = __importDefault(require("../dtos/users.dtos"));
class UserService {
    constructor(redisClient = new redis_provider_1.RedisProvider(), userRepository = users_dtos_1.default) {
        this.redisClient = redisClient;
        this.userRepository = userRepository;
        database_module_1.default;
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!params.limit || !params.offset) {
            //   throw new Error(errors.common.params);
            // }
            const { limit, offset } = params;
            const tableName = this.userRepository.collection.collectionName;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const dbData = yield this.userRepository
                    .find({})
                    .limit(limit)
                    .skip(offset)
                    .sort({ createdAt: -1 });
                if (dbData)
                    this.redisClient.update(tableName, dbData);
                console.log(messages_1.info.database.served);
                return dbData;
            }
            console.log(messages_1.info.redis.served);
            return redisData;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.userRepository.collection.collectionName + id;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const dbData = yield this.userRepository.findOne({ _id: id });
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
            const user = new users_dtos_1.default(Object.assign({}, data));
            const findUser = yield this.userRepository.findOne({ email: data.email });
            if (findUser)
                return false;
            const newUser = this.userRepository.create(user);
            const tableName = this.userRepository.collection.collectionName;
            this.redisClient.delete(tableName);
            return newUser;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ _id: id });
            if (!user)
                return false;
            const updatedUser = yield this.userRepository.updateOne({ _id: id }, changes);
            return updatedUser;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ _id: id });
            if (!user)
                return false;
            return this.userRepository.deleteOne({ _id: id });
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ email, password });
            if (!user)
                return false;
            return user;
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ email });
            if (!user)
                return false;
            return user;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map