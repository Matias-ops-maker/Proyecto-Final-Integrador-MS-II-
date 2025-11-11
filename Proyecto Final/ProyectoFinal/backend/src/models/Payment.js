import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  medio: {
    type: DataTypes.ENUM('tarjeta', 'transferencia', 'efectivo'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    defaultValue: 'pendiente',
  },
  transaccion_ref: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'payments',
  timestamps: false,
});

export default Payment;

