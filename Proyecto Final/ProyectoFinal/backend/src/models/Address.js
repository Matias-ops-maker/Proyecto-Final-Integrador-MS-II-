import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'addresses',
  timestamps: false,
});

export default Address;

