import { Router } from 'express';
import { UserService } from '../services/users.service';
import jwt from 'jsonwebtoken';
import { LoginUser } from '../entities/users.entities';
import { config } from '../../config';

const router = Router();

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
  const userService = new UserService();

  userService
    .login(req.body as LoginUser)
    .then((data) => {
      console.log(`fastlog => data`, data);

      if (data) {
        const jwToken = jwt.sign(
          { id: data._id, email: req.body.email },
          config.value.jwt.secret
        );
        res.cookie('token', jwToken);
        res.json({ message: 'Connected!', token: jwToken });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
