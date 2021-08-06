import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio';

describe('Studio routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });
  
});
