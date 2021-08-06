import { Router } from 'express';
import Film from '../models/Film';
import Studio from '../models/Studio';

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
  });
