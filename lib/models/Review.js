import { Sequelize } from 'sequelize';
import database from '../utils/database';

const { DataTypes, Model } = Sequelize;

class Review extends Model {}

Review.init(
  {
    rating: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Review;
