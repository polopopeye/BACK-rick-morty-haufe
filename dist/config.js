"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
const configData = {
    db: {
        url: process.env.DB_URL,
    },
    redis: {
        url: process.env.REDIS_URL,
        cacheTimeOut: process.env.REDIS_CACHE_TIMEOUT || '30',
        enabled: process.env.REDIS_ENABLED === 'true',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
    },
};
console.log(`fastlog => configData`, configData);
const configSchema = joi_1.default.object().keys({
    db: joi_1.default.object()
        .keys({
        url: joi_1.default.string().required(),
    })
        .required(),
    redis: joi_1.default.object()
        .keys({
        url: joi_1.default.string().required(),
        cacheTimeOut: joi_1.default.string().required(),
        enabled: joi_1.default.boolean().required(),
    })
        .required(),
    jwt: joi_1.default.object()
        .keys({
        secret: joi_1.default.string().required(),
    })
        .required(),
});
exports.config = configSchema.validate(configData);
//# sourceMappingURL=config.js.map