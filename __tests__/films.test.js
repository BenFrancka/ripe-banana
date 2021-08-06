import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';

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
      studio: studio.id,
      released: 1997,
    });

    expect(res.body).toEqual({
      id: 1,
      title: 'Anaconda',
      studio: `${studio.id}`,
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
      studio: studio.id,
      released: 1997,
    };
    const film2 = {
      title: 'Space Jam',
      studio: studio.id,
      released: 1996,
    };

    await Film.bulkCreate([film1, film2]);
    const res = await request(app).get('/api/v1/films');

    expect(res.body).toEqual([
      {
        id: 1,
        ...film1,
      },
      {
        id: 2,
        ...film2,
      },
    ]);
  });
});