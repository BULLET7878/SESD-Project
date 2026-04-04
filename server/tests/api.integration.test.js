import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';

describe('API Integration Tests', () => {
  let mongoServer;

  // Setup memory database before tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Teardown database after tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /', () => {
    it('should return API is Working message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('API is Working');
    });
  });

  describe('GET /api/product/list', () => {
    it('should return a JSON object with success status', async () => {
      const response = await request(app).get('/api/product/list');
      // Even if empty, it should successfully interact with the DB and return status 200
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success');
    });
  });
});
