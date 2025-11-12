import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

// Test database setup
process.env.DB_NAME = 'repuestos_test';
process.env.NODE_ENV = 'test';

// Global test timeout
jest.setTimeout(30000);