"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModule = void 0;
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const login_controller_1 = __importDefault(require("./controllers/login.controller"));
const userModule = (app) => {
    app.use('/users', users_controller_1.default);
    app.use('/', login_controller_1.default);
};
exports.userModule = userModule;
//# sourceMappingURL=users.module.js.map