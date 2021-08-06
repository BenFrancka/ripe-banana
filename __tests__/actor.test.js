import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

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
});
