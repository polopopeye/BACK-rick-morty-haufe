"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const mongoDB = config_1.config.value.db.url;
mongoose_1.default.connect(mongoDB);
const db = mongoose_1.default.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('MongoDB connected'));
exports.default = db;
//# sourceMappingURL=database.module.js.map