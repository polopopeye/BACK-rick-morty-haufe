import { Router } from 'express';

const router = Router();

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

export default router;
