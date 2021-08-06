import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import StudioController from './controllers/studios';
import ActorController from './controllers/actors';
import ReviewersController from './controllers/reviewers';
import FilmController from './controllers/films';


const app = express();

app.use(express.json());

app.use('/api/v1/studios', StudioController);
app.use('/api/v1/actors', ActorController);
app.use('/api/v1/reviewers', ReviewersController);
app.use('/api/v1/films', FilmController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
