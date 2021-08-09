import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Review from '../lib/models/Review.js';
import Film from '../lib/models/Film';
import Reviewer from '../lib/models/Reviewer';
import Studio from '../lib/models/Studio';

describe('Review routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a review via POST', async () => {
    const studio = await Studio.create({
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    });
    const film = await Film.create({
      title: 'Anaconda',
      StudioId: studio.id,
      released: 1997,
    });
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes',
    });

    const res = await request(app).post('/api/v1/reviews').send({
      rating: 3,
      ReviewerId: 1,
      review: 'this was fine i guess',

      FilmId: film.id,
    });

    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      review: 'this was fine i guess',
      FilmId: film.id,
      ReviewerId: reviewer.id,
    });
  });

  it('gets all reviews via GET', async () => {
    const studio = await Studio.create({
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    });
    const film = await Film.create({
      title: 'Anaconda',
      StudioId: studio.id,
      released: 1997,
    });
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes',
    });
    await Review.create({
      rating: 3,
      review: 'this was fine i guess',
      FilmId: film.id,
      ReviewerId: reviewer.id,
    });
    await Review.create({
      rating: 5,
      review: 'absolutely lit',
      FilmId: film.id,
      ReviewerId: reviewer.id,
    });
    const res = await request(app).get('/api/v1/reviews');

    expect(res.body).toEqual([
      {
        id: 1,
        rating: 3,
        review: 'this was fine i guess',
        Film: {
          id: 1,
          title: 'Anaconda',
        },
      },
      {
        id: 2,
        rating: 5,
        review: 'absolutely lit',
        Film: {
          id: 1,
          title: 'Anaconda',
        },
      },
    ]);
  });

  it('deletes a review via DELETE', async () => {
    const film = await Film.create({
      title: 'Anaconda',
      released: 1997,
    });
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes',
    });
    const  review = await Review.create({
      rating: 3,
      review: 'this was fine i guess',
      FilmId: film.id,
      ReviewerId: reviewer.id,
    });
    const res = await request(app).delete(`/api/v1/reviews/${review.id}`);

    expect(res.body).toEqual({ message: 'review go bye-bye' });
  });
});
