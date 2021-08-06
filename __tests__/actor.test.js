import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';

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
});
