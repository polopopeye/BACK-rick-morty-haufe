import { Router } from 'express';
import loginVerify from '../../utils/loginVerify';
import { errors } from '../../utils/messages';
import { FavouriteService } from '../services/favourite.service';

const router = Router();

/**
 * @openapi
 * /favourite/
 *   post:
 *     description: find one favourite
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
router.post('/', loginVerify, (req, res) => {
  const { userId, characterId } = req.body;

  const favouriteService = new FavouriteService();
  favouriteService
    .findOne(userId, characterId)
    .then((data) => {
      if (data) {
        res.json({ message: 'found', data });
      } else {
        res.status(404).json({ message: errors.favourite.notFound });
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
 *         description: User created successfully
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/User'
 */
router.post('/create', (req, res) => {
  const favouriteService = new FavouriteService();
  favouriteService
    .create(req.body)
    .then((data) => {
      if (data) {
        res.json({ message: 'Favourite Created Successfully', data });
      } else {
        res.status(404).json({ message: errors.favourite.alreadyExists });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/**
 * @openapi
 * /favourite/:id:
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
router.put('/modify', loginVerify, (req, res) => {
  const { userId, characterId } = req.body;

  const favouriteService = new FavouriteService();
  favouriteService
    .update(userId, characterId, req.body)
    .then((data) => {
      if (data) {
        res.json({ message: 'Favourite Updated', data });
      } else {
        res.status(404).json({ message: errors.favourite.notFound });
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
router.delete('/delete', loginVerify, (req, res) => {
  const { userId, characterId } = req.body;
  const favouriteService = new FavouriteService();
  favouriteService
    .remove(userId, characterId)
    .then((data) => {
      if (data) {
        res.json({ message: 'Favourite Removed', data });
      } else {
        res.status(404).json({ message: errors.favourite.notFound });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;
