import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Studio from '../lib/models/Studio';

describe('Studio routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });
  it('creates a studio via POST', async () => {
    const result = await request(app).post('/api/v1/studios').send({ name: 'Warner Brothers', city: 'Burbank', state: 'California', country: 'USA' });
    
    expect(result.body).toEqual({ id: 1, name: 'Warner Brothers', city: 'Burbank', state: 'California', country: 'USA' });
  });
});
