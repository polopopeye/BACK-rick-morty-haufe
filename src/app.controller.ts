import { Router } from 'express';
import { UserService } from './users/services/users.service';
import jwt from 'jsonwebtoken';

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

/**
 * @openapi
 * /users/:
 *    post:
 *     description:  Login
 *     responses:
 *       200:
 *         description: Login user
 *     parameters:
 *       - in: body
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: Email of the user
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description:  Password of the user
 */
router.post('/login', (req, res) => {
  const userService = new UserService();
  const { email, password } = req.body;
  userService
    .login(email, password)
    .then((data) => {
      const jwToken = jwt.sign(
        { id: data._id, email: email },
        process.env.JWT_SECRET
      );
      res.json({ message: 'Connected!', token: jwToken });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
