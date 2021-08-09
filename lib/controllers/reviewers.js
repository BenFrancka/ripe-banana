import { Router } from 'express';
import Reviewer from '../models/Reviewer';
import Film from '../models/Film';
import Review from '../models/Review';

export default Router()
  .post('/', async(req, res, next) => {
    try {
      const reviewer = await Reviewer.create(req.body);

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const reviewers = await Reviewer.findAll();

      res.send(reviewers);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const reviewer = await Reviewer.findByPk(req.params.id,
        {
          attributes: ['id', 'name', 'company'],
          include: [{
            model: Review,
            attributes: ['id', 'rating', 'review'],
            include: [
              {
                model: Film,
                attributes: ['id', 'title'],
              },
            ]
          }]
        });

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const reviewer = await Reviewer
        .update(
          req.body,
          { 
            where: { id: req.params.id },
            returning: true
          });

      res.send(reviewer[1][0]);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      await Reviewer
        .destroy({ where: { id: req.params.id }, });

      res.send({ message: 'reviewer deleted' });
    } catch (err) {
      next(err);
    }
  });
