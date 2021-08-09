import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';

describe('Actor routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });
  it('creates an actor via POST', async () => {
    const res = await request(app).post('/api/v1/actors')
      .send({ name: 'Ben Affleck', dob: '1972-08-15', pob: 'Berkeley, CA' });
      
    expect(res.body).toEqual({
      id: 1,
      name: 'Ben Affleck',
      dob: '1972-08-15',
      pob: 'Berkeley, CA'
    });
  });
    
  it('gets list of actors via GET', async () => {
    const actor1 = {
      name: 'Ben Affleck',
      dob: '1972-08-15',
      pob: 'Berkeley, CA'
    };
      
    const actor2 = {
      name: 'Denzel Washington',
      dob: '1954-12-28',
      pob: 'Mount Vernon, NY'
    };
      
    await Actor.bulkCreate([actor1, actor2]);
      
    const res = await request(app).get('/api/v1/actors');
      
    expect(res.body).toEqual([{
      id: 1,
      ...actor1
    }
    , {
      id: 2,
      ...actor2
    }]);
  });
    
  it('returns a detail view of an actor by id via GET', async () => {
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

    await actor.setFilms(film);
    await film.setStudio(studio);
    await film.setActors(actor);

    const res = await request(app).get(`/api/v1/actors/${actor.id}`);

    expect(res.body).toEqual({
      name: 'Denzel Washington',
      dob: '1954-12-28',
      pob: 'Mount Vernon, NY',
      Films: [{
        id: film.id,
        title: 'Anaconda',
        released: 1997
      }]
    });
  });
});
