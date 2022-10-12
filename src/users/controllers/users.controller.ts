import { Router } from 'express';
import { PaginationUser } from '../entities/users.entities';
import { UserService } from '../services/users.service';

const router = Router();

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
router.get('/', (req, res) => {
  const userService = new UserService();
  userService
    .findAll(req.query as unknown as PaginationUser)
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
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const userService = new UserService();
  userService
    .findOne(id)
    .then((data) => {
      res.json({ message: 'found', data });
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
  const userService = new UserService();
  userService
    .create(req.body)
    .then((data) => {
      res.json({ message: 'User Created', data });
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
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const userService = new UserService();
  userService
    .update(id, req.body)
    .then((data) => {
      res.json({ message: 'User Updated', data });
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
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const userService = new UserService();
  userService
    .remove(id)
    .then((data) => {
      res.json({ message: 'User Removed', data });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;
