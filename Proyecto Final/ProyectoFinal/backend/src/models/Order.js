import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
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
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado', 'pagado'),
    defaultValue: 'pendiente',
  },
  payment_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled', 'in_process'),
    defaultValue: 'pending',
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

export default Order;

