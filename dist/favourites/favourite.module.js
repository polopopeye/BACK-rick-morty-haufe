"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteModule = void 0;
const favourite_controller_1 = __importDefault(require("./controllers/favourite.controller"));
const favouriteModule = (app) => {
    app.use('/favourite', favourite_controller_1.default);
};
exports.favouriteModule = favouriteModule;
//# sourceMappingURL=favourite.module.js.map