import { Router, urlencoded } from 'express';
import loginVerify from '../../utils/loginVerify';
import { errors } from '../../utils/messages';
import { CharacterService } from '../services/character.service';
import url from 'url';

const router = Router();

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
router.get('/', loginVerify, (req, res) => {
  const page = parseInt(req.query.page as string);
  console.log(`fastlog => page`, page);

  const characterService = new CharacterService();
  characterService
    .findAll(page)
    .then((data) => {
      if (data) {
        res.json({ message: 'found', data });
      } else {
        res.status(404).json({ message: errors.common.notFound });
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
router.get('/:id', loginVerify, (req, res) => {
  const id = req.params.id;

  const characterService = new CharacterService();
  characterService
    .findOne(id)
    .then((data) => {
      if (data) {
        res.json({ message: 'found', data });
      } else {
        res.status(404).json({ message: errors.common.notFound });
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
router.get('/search/', loginVerify, (req, res) => {
  const data = req.query;
  const newurl = urlencoded(data).toString();
  console.log(`fastlog => newurl`, newurl);

  const characterService = new CharacterService();
  characterService
    .filterCharacter(newurl)
    .then((data) => {
      if (data) {
        res.json({ message: 'found', data });
      } else {
        res.status(404).json({ message: errors.common.notFound });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;
