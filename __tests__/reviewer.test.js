import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Review from '../lib/models/Review.js';
import Film from '../lib/models/Film.js';

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

  it('gets list of reviewers via GET', async () => {
    const reviewer1 = {
      name: 'Bob',
      company: 'Rotten Tomatoes'
    };

    const reviewer2 = {
      name: 'Jeff',
      company: 'Vice'
    };

    await Reviewer.bulkCreate([reviewer1, reviewer2]);

    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual([
      {
        id: 1,
        ...reviewer1
      },
      {
        id: 2,
        ...reviewer2
      }
    ]);
  });

  it('returns a detail view of a reviewer by id via GET', async () => {
    const film = await Film.create({
      title: 'Anaconda',
      released: 1997,
    });
    
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes'
    });

    const review = await Review.create({
      rating: 3,
      review: 'this was fine i guess',
      FilmId: film.id,
      ReviewerId: reviewer.id,
    });

    const res = await request(app).get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({
      id: reviewer.id,
      name: 'Bob',
      company: 'Rotten Tomatoes',
      Reviews: [{
        id: review.id,
        rating: 3,
        review: 'this was fine i guess',
        Film: {
          id: film.id,
          title: 'Anaconda',
        },
      }],
    });
  });

  it('updates a reviewer entry by id', async () => {
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes'
    });

    const res = await request(app)
      .patch(`/api/v1/reviewers/${reviewer.id}`)
      .send({ company: 'some other company' });

    expect(res.body).toEqual({
      id: 1,
      name: 'Bob',
      company: 'some other company'
    });
  });

  it('deletes a reviewer with no reviews by id', async () => {
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes'
    });

    const res = await request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`);
      

    expect(res.body).toEqual({
      message: 'reviewer deleted'
    });
  });

  it('will not delete a reviewer that has reviews', async () => {
    const film = await Film.create({
      title: 'Anaconda',
      released: 1997,
    });
    const reviewer = await Reviewer.create({
      name: 'Bob',
      company: 'Rotten Tomatoes',
    });
    const  review = await Review.create({
      rating: 3,
      review: 'this was fine i guess',
      FilmId: film.id,
      ReviewerId: reviewer.id,
    });


    const res = await request(app)
      .delete(`/api/v1/reviews/${review.id}`);
    
    const existingReviewer = await Reviewer.findbyPk(reviewer.id);

    expect(res.body).toEqual({
      message: 'reviewers with reviews cannot by deleted'
    });
    expect(existingReviewer).toEqual(reviewer);
  });



});
