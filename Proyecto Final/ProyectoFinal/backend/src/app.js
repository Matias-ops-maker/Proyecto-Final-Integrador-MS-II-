import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './models/index.js';
import { checkApiKey } from './middlewares/apiKey.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import brandRoutes from './routes/brands.js';
import vehicleRoutes from './routes/vehicles.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import reportRoutes from './routes/reports.js';
import paymentRoutes from './routes/payments.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http:
  credentials: true
}));
app.use(express.json());

app.use(checkApiKey);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/health', (req, res) => res.json({
  ok: true,
  timestamp: new Date().toISOString(),
  env: process.env.NODE_ENV || 'development'
}));

app.use((error, req, res, _next) => {
  res.status(500).json({
    error: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 4000;

process.on('uncaughtException', (error) => {
  
});

process.on('unhandledRejection', (reason, promise) => {
  
});

(async () => {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ force: false });
      }

    const server = app.listen(PORT, () => {
      });

    server.on('error', (error) => {
      });

  } catch (err) {
    process.exit(1);
  }
})();


