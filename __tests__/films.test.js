import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';
import Actor from '../lib/models/Actor';
import Review from '../lib/models/Review';
import Reviewer from '../lib/models/Reviewer';

describe('Film routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a film with POST', async () => {
    const studio = await Studio.create({
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    });
    const res = await request(app).post('/api/v1/films').send({
      title: 'Anaconda',
      StudioId: studio.id,
      released: 1997,
    });

    expect(res.body).toEqual({
      id: 1,
      title: 'Anaconda',
      StudioId: studio.id,
      released: 1997,
    });
  });

  it('gets all films from the database with GET', async () => {
    const studio = await Studio.create({
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    });
    const film1 = {
      title: 'Anaconda',
      StudioId: studio.id,
      released: 1997,
    };
    const film2 = {
      title: 'Space Jam',
      StudioId: studio.id,
      released: 1996,
    };

    await Film.bulkCreate([film1, film2]);
    const res = await request(app).get('/api/v1/films');

    expect(res.body).toEqual([
      {
        id: 1,
        Studio: {
          id: 1,
          name: 'Warner Brothers',
        },
        title: 'Anaconda',
        released: 1997,
      },

      {
        id: 2,
        Studio: {
          id: 1,
          name: 'Warner Brothers',
        },
        title: 'Space Jam',
        released: 1996,
      },
    ]);
  });

  it('gets a film by id with GET, includes reviews, studio, and cast/actor', async () => {
    const studio = await Studio.create({
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    });

    const actor = await Actor.create({
      name: 'Denzel Washington',
      dob: '1954-12-28',
      pob: 'Mount Vernon, NY',
    });

    const film = await Film.create({
      title: 'Anaconda',
      released: 1997,
    });

    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes',
    });

    const review = await Review.create({
      rating: 3,
      review: 'this was fine i guess',
    });

    await actor.setFilms(film);
    await film.setStudio(studio);
    await film.setActors(actor);
    await review.setReviewer(reviewer);
    await review.setFilm(film);

    const res = await request(app).get(`/api/v1/films/${film.id}`);

    expect(res.body).toEqual({
      title: 'Anaconda',
      released: 1997,
      studio: {
        id: studio.id,
        name: 'Warner Brothers',
      },
      cast: [
        {
          id: actor.id,
          name: 'Denzel Washington',
        },
      ],
      reviews: [
        {
          id: review.id,
          rating: 3,
          review: 'this was fine i guess',
          reviewer: {
            id: reviewer.id,
            name: 'Bob',
          },
        },
      ],
    });
  });
});
