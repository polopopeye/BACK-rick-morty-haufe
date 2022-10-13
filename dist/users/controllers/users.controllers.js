"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = require("../services/users.service");
const router = (0, express_1.Router)();
const userService = users_service_1.UserService.call(this);
/**
 * @openapi
 * /:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: list all users
 */
router.get('/', (req, res) => {
    userService.findAll().then((data) => {
        res.json({ message: 'found', data });
    });
});
/**
 * @openapi
 * /:
 *   post:
 *     description: create a new user endpoint
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post('/', (req, res) => {
    userService.create(req.body).then((data) => {
        res.json({ message: 'created', data });
    });
});
exports.default = router;
//# sourceMappingURL=users.controllers.js.map