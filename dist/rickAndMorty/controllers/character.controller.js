"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginVerify_1 = __importDefault(require("../../utils/loginVerify"));
const messages_1 = require("../../utils/messages");
const character_service_1 = require("../services/character.service");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /character/:
 *    get:
 *     description:  get all characters
 *     responses:
 *       200:
 *         description:  get all characters
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type:  integer
 *           format: number
 *           default: 1
 *         required: true
 *         description: The id of the character
 */
router.get('/', loginVerify_1.default, (req, res) => {
    const page = parseInt(req.query.page);
    console.log(`fastlog => page`, page);
    const characterService = new character_service_1.CharacterService();
    characterService
        .findAll(page)
        .then((data) => {
        if (data) {
            res.json({ message: 'found', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.common.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
/**
 * @openapi
 * /character/:id:
 *   get:
 *     description: get one character
 *     responses:
 *       200:
 *         description:  get one character
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the character
 */
router.get('/:id', loginVerify_1.default, (req, res) => {
    const id = req.params.id;
    const characterService = new character_service_1.CharacterService();
    characterService
        .findOne(id)
        .then((data) => {
        if (data) {
            res.json({ message: 'found', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.common.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
/**
 * @openapi
 * /character/search/:
 *   get:
 *     description: search characters
 *     responses:
 *      200:
 *       description: search characters
 *     parameters:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.get('/search/', loginVerify_1.default, (req, res) => {
    const data = req.query;
    const newurl = (0, express_1.urlencoded)(data).toString();
    console.log(`fastlog => newurl`, newurl);
    const characterService = new character_service_1.CharacterService();
    characterService
        .filterCharacter(newurl)
        .then((data) => {
        if (data) {
            res.json({ message: 'found', data });
        }
        else {
            res.status(404).json({ message: messages_1.errors.common.notFound });
        }
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
exports.default = router;
//# sourceMappingURL=character.controller.js.map