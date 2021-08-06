import { Sequelize } from 'sequelize';
import database from '../utils/database';

const { DataTypes, Model } = Sequelize;

class Film extends Model {}

Film.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studio: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    released: {
      type: DataTypes.INTEGER(4),
    },
  },
  { sequelize: database, timstamps: false }
);

export default Film;
