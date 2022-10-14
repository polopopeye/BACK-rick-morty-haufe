import { Router } from 'express';
import loginVerify from '../../utils/loginVerify';
import { errors } from '../../utils/messages';
import { FavouriteService } from '../services/favourite.service';

const router = Router();

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
 * /favourite/user:
 *    get:
 *     description: find users favourites
 *     responses:
 *       200:
 *         description: find users favourites
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          userId:
 *           type: string
 */
router.post('/user', loginVerify, (req, res) => {
  const { userId } = req.body;

  const favouriteService = new FavouriteService();
  favouriteService
    .findUsersFav(userId)
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
 *         description: Favourite created successfully
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Favourite'
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
 * /favourite/delete:
 *   delete:
 *     description: get all users
 *     responses:
 *       200:
 *         description: list all users
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Favourite'
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
