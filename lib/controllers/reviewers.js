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
      //get reviews by id
      const reviews = await Review.findAll({
        where: { ReviewerId: req.params.id }
      });
      //verify that the reviewer has reviews posted
      if(reviews.length) {
        res.send({ message: 'reviewers with reviews cannot by deleted' });
        return;
      } 
      //if no reviews, delete reviewer
      await Reviewer
        .destroy({ where: { id: req.params.id }, });

      res.send({ message: 'reviewer deleted' });
      //if reviews are present, do not delete, return can't be deleted message
    } catch (err) {
      next(err);
    }
  });

