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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const users_service_1 = require("../users/services/users.service");
// Login middleware to verify if the user is logged
const loginVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: we can handle roles here, for example, if the user is an admin, we can allow him to access all routes
    // or block user to handle only routes that he can access for example only modify his own profile
    if (!req.cookies || !req.cookies.token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const token = req.cookies.token;
    console.log(`fastlog => token`, token);
    const decoded = jsonwebtoken_1.default.verify(token, config_1.config.value.jwt.secret);
    if (decoded) {
        console.log(`fastlog => decoded`, decoded);
        const { id, email } = decoded;
        const userService = new users_service_1.UserService();
        const user = (yield userService.findOne(id));
        if (user && user.email === email) {
            next();
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
});
exports.default = loginVerify;
//# sourceMappingURL=loginVerify.js.map