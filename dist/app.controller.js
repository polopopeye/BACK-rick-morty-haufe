"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome!
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
router.get('/', (req, res) => {
    res.json({ message: 'Hi!! You can go to /docs to see the swagger' });
});
exports.default = router;
//# sourceMappingURL=app.controller.js.map