import { Router } from 'express';
import Reviewer from '../models/Reviewer';

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
      const reviewer = await Reviewer.findByPk(req.params.id);

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  })

;
