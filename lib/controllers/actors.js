import { Router } from 'express';
import Actor from '../models/Actor';
import Film from '../models/Film';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const actor = await Actor.create(req.body);
      res.send(actor);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const actors = await Actor.findAll();

      res.send(actors);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const actor = await Actor.findOne({
        where: { id: req.params.id },
        attributes: ['name', 'dob', 'pob'],
        include: 
          {
            model: Film,
            through: { attributes: [] },
            attributes: ['id', 'title', 'released']
          },
      });

      res.send(actor);
    } catch (err) {
      next(err);
    }
  });
