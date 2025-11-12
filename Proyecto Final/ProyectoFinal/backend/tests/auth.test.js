import request from 'supertest';
import app from '../src/app.js';
import { sequelize } from '../src/models/index.js';

const API_KEY = process.env.API_KEY;

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/auth/register', () => {
    test('Should register a new user', async () => {
      const userData = {
        nombre: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .set('x-api-key', API_KEY)
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('msg');
      expect(response.body.user).toHaveProperty('email', userData.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    test('Should not register user with existing email', async () => {
      const userData = {
        nombre: 'Test User 2',
        email: 'test@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .set('x-api-key', API_KEY)
        .send(userData)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    test('Should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .set('x-api-key', API_KEY)
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', loginData.email);
    });

    test('Should not login with invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      await request(app)
        .post('/api/auth/login')
        .set('x-api-key', API_KEY)
        .send(loginData)
        .expect(401);
    });
  });
});