import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', (req, res) => {
  res.json({ message: 'Hi!! You can go to /docs to see the swagger' });
});

export default router;
