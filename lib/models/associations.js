import Film from './Film';
import Studio from './Studio';

Studio.hasMany(Film);
Film.belongsTo(Studio);
