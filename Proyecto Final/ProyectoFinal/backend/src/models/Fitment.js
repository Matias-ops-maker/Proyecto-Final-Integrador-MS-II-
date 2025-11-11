import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Fitment = sequelize.define('Fitment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vehicles',
      key: 'id',
    },
  },
}, {
  tableName: 'fitments',
  timestamps: false,
});

export default Fitment;

