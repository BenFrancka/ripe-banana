import { Router } from 'express';
import Review from '../models/Review';

export default Router().post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.send(review);
  } catch (err) {
    next(err);
  }
});
