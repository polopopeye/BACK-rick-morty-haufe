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
exports.CharacterService = void 0;
const axios_1 = __importDefault(require("axios"));
const database_module_1 = __importDefault(require("../../database/database.module"));
const redis_provider_1 = require("../../redis/redis.provider");
const messages_1 = require("../../utils/messages");
class CharacterService {
    constructor(redisClient = new redis_provider_1.RedisProvider(), axiosCall = axios_1.default) {
        this.redisClient = redisClient;
        this.axiosCall = axiosCall;
        database_module_1.default;
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // single id or id separated by comma
            const apiUrl = 'https://rickandmortyapi.com/api/character/' + id;
            const tableName = 'rickAndMorty/Character' + id;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const apiData = yield this.axiosCall.get(apiUrl);
                if (apiData) {
                    this.redisClient.update(tableName, apiData.data);
                    console.log(messages_1.info.database.served);
                    return apiData.data;
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
    findAll(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = 'https://rickandmortyapi.com/api/character/?page=' + page;
            const tableName = 'rickAndMorty/allCharacters' + page;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const apiData = yield this.axiosCall.get(apiUrl);
                if (apiData) {
                    this.redisClient.update(tableName, apiData.data);
                    console.log(messages_1.info.database.served);
                    return apiData.data;
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
    filterCharacter(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = 'https://rickandmortyapi.com/api/character/?' + params;
            const tableName = 'rickAndMorty/filterCharacter' + params;
            const redisData = yield this.redisClient.get(tableName);
            if (!redisData) {
                const apiData = yield this.axiosCall.get(apiUrl);
                if (apiData) {
                    this.redisClient.update(tableName, apiData.data);
                    console.log(messages_1.info.database.served);
                    return apiData.data;
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
}
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map