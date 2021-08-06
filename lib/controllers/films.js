import { Router } from 'express';
import Film from '../models/Film';

export default Router().post('/', async (req, res, next) => {
  try {
    const film = await Film.create(req.body);

    res.send(film);
  } catch (err) {
    next(err);
  }
});
