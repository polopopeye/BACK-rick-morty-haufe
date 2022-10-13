"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginVerify_1 = __importDefault(require("../../utils/loginVerify"));
const messages_1 = require("../../utils/messages");
const favourite_service_1 = require("../services/favourite.service");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /favourite/:
 *    post:
 *     description: find one favourite
 *     responses:
 *       200:
 *         description: find one favourite
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          userId:
 *           type: string
 *          characterId:
 *           type: string
 */
router.post('/', loginVerify_1.default, (req, res) => {
    const { userId, characterId } = req.body;
    const favouriteService = new favourite_service_1.FavouriteService();
    favouriteService
        .findOne(userId, characterId)
        .then((data) => {
        if (data) {
            res.json({ message: 'found', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.favourite.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
/**
 * @openapi
 * /favourite/create:
 *    post:
 *     description: Create a new favourite
 *     responses:
 *       200:
 *         description: Favourite created successfully
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Favourite'
 */
router.post('/create', (req, res) => {
    const favouriteService = new favourite_service_1.FavouriteService();
    favouriteService
        .create(req.body)
        .then((data) => {
        if (data) {
            res.json({ message: 'Favourite Created Successfully', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.favourite.alreadyExists });
        }
    })
        .catch((err) => {
        res.status(500).json(err);
    });
});
/**
 * @openapi
 * /favourite/modify:
 *    put:
 *     description: modify a favourite
 *     responses:
 *       200:
 *         description: favourite modified successfully
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Favourite'
 */
router.put('/modify', loginVerify_1.default, (req, res) => {
    const { userId, characterId } = req.body;
    const favouriteService = new favourite_service_1.FavouriteService();
    favouriteService
        .update(userId, characterId, req.body)
        .then((data) => {
        if (data) {
            res.json({ message: 'Favourite Updated', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.favourite.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
/**
 * @openapi
 * /favourite/:id:
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
router.delete('/delete', loginVerify_1.default, (req, res) => {
    const { userId, characterId } = req.body;
    const favouriteService = new favourite_service_1.FavouriteService();
    favouriteService
        .remove(userId, characterId)
        .then((data) => {
        if (data) {
            res.json({ message: 'Favourite Removed', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.favourite.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
exports.default = router;
//# sourceMappingURL=favourite.controller.js.map