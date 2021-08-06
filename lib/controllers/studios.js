import { Router } from 'express';
import Studio from '../models/Studio';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const studio = await Studio.create(req.body);
      res.send(studio);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const studios = await Studio.findAll();
      res.send(studios);
    } catch (err) {
      next(err);
    }
  });
