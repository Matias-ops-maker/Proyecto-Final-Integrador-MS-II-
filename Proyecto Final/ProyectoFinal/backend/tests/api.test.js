import request from 'supertest';
import app from '../src/app.js';

describe('Health Check', () => {
  test('GET /health should return status 200', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('ok', true);
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('API Key Protection', () => {
  test('Requests without API key should return 401', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(401);

    expect(response.body).toHaveProperty('error');
  });

  test('Requests with valid API key should proceed', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('x-api-key', process.env.API_KEY)
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});