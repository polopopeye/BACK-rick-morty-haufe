"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = require("../services/users.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /login:
 *    post:
 *     description:  Login
 *     responses:
 *       200:
 *         description: Login user
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Login'
 *
 */
router.post('/login', (req, res) => {
    const userService = new users_service_1.UserService();
    userService
        .login(req.body)
        .then((data) => {
        console.log(`fastlog => data`, data);
        if (data) {
            const jwToken = jsonwebtoken_1.default.sign({ id: data._id, email: req.body.email }, config_1.config.value.jwt.secret);
            res.cookie('token', jwToken, { sameSite: 'none', secure: true });
            res.json({ message: 'Connected!', token: jwToken });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    })
        .catch((err) => {
        res.status(500).json(err);
    });
});
exports.default = router;
//# sourceMappingURL=login.controller.js.map