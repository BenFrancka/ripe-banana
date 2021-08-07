import { Router } from 'express';
import Review from '../models/Review';
import Film from '../models/Film';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const review = await Review.create(req.body);

      res.send(review);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.findAll({
        attributes: ['id', 'rating', 'review'],
        include: [
          {
            model: Film,
            attributes: ['id', 'title'],
          },
        ],
      });
      res.send(reviews);
    } catch (err) {
      next(err);
    }
  });
