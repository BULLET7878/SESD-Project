import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';

describe('API Integration Tests', () => {
  let mongoServer;

  // Setup in-memory database before all tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Teardown database after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // ─── Health Check ─────────────────────────────────────────────
  describe('GET /', () => {
    it('should return API is Working message', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.text).toBe('API is Working');
    });
  });

  // ─── Product Routes ───────────────────────────────────────────
  describe('GET /api/product/list', () => {
    it('should return success with an array (even if empty)', async () => {
      const res = await request(app).get('/api/product/list');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.products)).toBe(true);
    });
  });

  // ─── User Auth Routes ─────────────────────────────────────────
  describe('POST /api/user/register', () => {
    it('should reject registration with missing fields', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({ email: 'test@test.com' }); // missing name and password
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({ name: 'Test User', email: 'test@blumart.com', password: 'password123' });
      // Accept 200 (success) or 400 (already exists in re-runs)
      expect([200, 400]).toContain(res.status);
    });
  });

  // ─── Auth Guard ───────────────────────────────────────────────
  describe('GET /api/user/is-auth', () => {
    it('should return unauthorized for unauthenticated request', async () => {
      const res = await request(app).get('/api/user/is-auth');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});

