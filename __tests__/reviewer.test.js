import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';

describe('Reviewer routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a reviewer via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Bob',
        company: 'Rotten Tomatoes'
      });

    expect(res.body).toEqual({ 
      id: 1,
      name: 'Bob',
      company: 'Rotten Tomatoes'
    });

  });
});
