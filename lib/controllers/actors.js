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
        include: 
          {
            model: Film,
            through: { attributes: [] },
            attributes: ['id', 'title', 'released']
          },
        // include: {
        //   model: Film,
        // },
        attributes: ['name', 'dob', 'pob'],
      });
        
      // const films = await actor.getFilms();

      res.send(actor);
    } catch (err) {
      next(err);
    }
  });
