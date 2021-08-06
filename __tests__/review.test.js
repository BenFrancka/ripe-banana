import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Review from '../lib/models/Review.js';
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
    await Film.create({
      title: 'Anaconda',
      StudioId: studio.id,
      released: 1997,
    });
    await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes',
    });

    const res = await request(app).post('/api/v1/reviews').send({
      rating: 3,
      ReviewerId: 1,
      review: 'this was fine i guess',
      FilmId: 1,
    });

    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      review: 'this was fine i guess',
      Film: {
        id: 1,
        title: 'Anaconda',
      },
      Reviewer: {
        name: 'Bob',
      },
    });
  });
});
