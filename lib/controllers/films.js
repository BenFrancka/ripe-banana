import { Router } from 'express';
import Film from '../models/Film';
import Studio from '../models/Studio';
import Actor from '../models/Actor';
import Review from '../models/Review';
import Reviewer from '../models/Reviewer';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const film = await Film.create(req.body);

      res.send(film);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const films = await Film.findAll({
        attributes: ['id', 'title', 'released'],
        include: [{ model: Studio, attributes: ['id', 'name'] }],
      });
      res.send(films);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const film = await Film.findOne({
        where: { id: req.params.id },
        attributes: ['title', 'released'],
        include: [
          {
            model: Studio,
            attributes: ['id', 'name'],
          },
          {
            model: Actor,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: Review,
            attributes: ['id', 'rating', 'review'],
            include: {
              model: Reviewer,
              attributes: ['id', 'name'],
            }
          }
        ],
      });

      res.send(film);
    } catch (err) {
      next(err);
    }
  });
