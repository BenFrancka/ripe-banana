import Film from './Film';
import Review from './Review';
import Studio from './Studio';
import Reviewer from '../models/Reviewer';

Studio.hasMany(Film);
Film.belongsTo(Studio);
Film.hasMany(Review);
Review.belongsTo(Film);
Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);
