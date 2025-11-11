import sequelize from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import Brand from './Brand.js';
import Category from './Category.js';
import Vehicle from './Vehicle.js';
import Fitment from './Fitment.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Address from './Address.js';
import Payment from './Payment.js';
import AuditLog from './AuditLog.js';
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Address, { foreignKey: 'user_id' });
Address.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AuditLog, { foreignKey: 'user_id' });
AuditLog.belongsTo(User, { foreignKey: 'user_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });
Brand.hasMany(Product, { foreignKey: 'brand_id' });

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
Product.belongsToMany(Vehicle, { through: Fitment, foreignKey: 'product_id' });
Vehicle.belongsToMany(Product, { through: Fitment, foreignKey: 'vehicle_id' });

Fitment.belongsTo(Product, { foreignKey: 'product_id' });
Fitment.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });
Product.hasMany(Fitment, { foreignKey: 'product_id' });
Vehicle.hasMany(Fitment, { foreignKey: 'vehicle_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

Order.hasOne(Payment, { foreignKey: 'order_id' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    } catch (error) {
    }
};
export {
  sequelize,
  User,
  Product,
  Brand,
  Category,
  Vehicle,
  Fitment,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Address,
  Payment,
  AuditLog,
};

