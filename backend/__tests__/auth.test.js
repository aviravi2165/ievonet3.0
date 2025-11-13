const request = require('supertest');
const app = require('../src/index');

describe('Health Check Endpoint', () => {
  test('GET /api/health should return server status', async () => {
    const response = await request(app)
      .get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('environment');
  });

  test('GET /api should return API info', async () => {
    const response = await request(app)
      .get('/api');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
  });
});

describe('Authentication Endpoints', () => {
  test('POST /api/auth/register should require all fields', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('POST /api/auth/login should require email and password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com' });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

describe('404 Handler', () => {
  test('Non-existent route should return 404', async () => {
    const response = await request(app)
      .get('/api/nonexistent');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
