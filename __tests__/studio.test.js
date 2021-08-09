import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';

describe('Studio routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });
  it('creates a studio via POST', async () => {
    const result = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Warner Brothers',
        city: 'Burbank',
        state: 'California',
        country: 'USA',
      });

    expect(result.body).toEqual({
      id: 1,
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    });
  });

  it('gets all studios via GET', async () => {
    const studio1 = {
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
    };
    const studio2 = {
      name: 'Lionsgate',
      city: 'Santa Monica',
      state: 'California',
      country: 'USA',
    };
    await Studio.bulkCreate([studio1, studio2]);
    const res = await request(app).get('/api/v1/studios');

    expect(res.body).toEqual([
      {
        id: 1,
        ...studio1,
      },
      {
        id: 2,
        ...studio2,
      },
    ]);
  });
  
  it('gets a studio by id via GET', async () => {    
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
    
    const res = await request(app).get(`/api/v1/studios/${studio.id}`);

    expect(res.body).toEqual({
      id: studio.id,
      name: 'Warner Brothers',
      city: 'Burbank',
      state: 'California',
      country: 'USA',
      Films: [{
        id: film.id,
        title: film.title
      }]
    });
  });
});
