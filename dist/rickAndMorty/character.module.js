"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterModule = void 0;
const character_controller_1 = __importDefault(require("./controllers/character.controller"));
const characterModule = (app) => {
    app.use('/character', character_controller_1.default);
};
exports.characterModule = characterModule;
//# sourceMappingURL=character.module.js.map