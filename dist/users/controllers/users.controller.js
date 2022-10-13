"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginVerify_1 = __importDefault(require("../../utils/loginVerify"));
const messages_1 = require("../../utils/messages");
const users_service_1 = require("../services/users.service");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /users/:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: list all users
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of items to skip before starting to collect the result set
 */
router.get('/', loginVerify_1.default, (req, res) => {
    const userService = new users_service_1.UserService();
    userService
        .findAll(req.query)
        .then((data) => {
        res.json({ message: 'found', data });
    })
        .catch((err) => {
        res.status(500).json({ message: err.message });
    });
});
/**
 * @openapi
 * /users/:id:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: list all users
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 */
router.get('/:id', loginVerify_1.default, (req, res) => {
    const id = req.params.id;
    const userService = new users_service_1.UserService();
    userService
        .findOne(id)
        .then((data) => {
        if (data) {
            res.json({ message: 'found', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.users.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
/**
 * @openapi
 * /users/:
 *    post:
 *     description: create a new user endpoint
 *     responses:
 *       200:
 *         description: User created successfully
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/User'
 */
router.post('/', (req, res) => {
    const userService = new users_service_1.UserService();
    userService
        .create(req.body)
        .then((data) => {
        if (data) {
            res.json({ message: 'User created successfully', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.users.alreadyExists });
        }
    })
        .catch((err) => {
        res.status(500).json(err);
    });
});
/**
 * @openapi
 * /users/:id:
 *    put:
 *     description: create a new user endpoint
 *     responses:
 *       200:
 *         description: User created successfully
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *       - in: body
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the user
 *       - in: body
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Email of the user
 *       - in: body
 *         name: birthDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Birthdate of the user
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description:  Password of the user
 */
router.put('/:id', loginVerify_1.default, (req, res) => {
    const id = req.params.id;
    const userService = new users_service_1.UserService();
    userService
        .update(id, req.body)
        .then((data) => {
        if (data) {
            res.json({ message: 'User Updated', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.users.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
/**
 * @openapi
 * /users/:id:
 *   delete:
 *     description: get all users
 *     responses:
 *       200:
 *         description: list all users
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 */
router.delete('/:id', loginVerify_1.default, (req, res) => {
    const id = req.params.id;
    const userService = new users_service_1.UserService();
    userService
        .remove(id)
        .then((data) => {
        if (data) {
            res.json({ message: 'User Removed', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.users.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
exports.default = router;
//# sourceMappingURL=users.controller.js.map