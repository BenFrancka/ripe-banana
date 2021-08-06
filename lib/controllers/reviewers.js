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

;
