/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import { generateToken } from '../src/common/createToken';
import Event from '../src/models/Event';


const userToken = generateToken('user@user.hu', 'user');


beforeAll(async () => {
  await testdb();
  await Event.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Event tests', () => {
  it('should refuse connect with invalid token', async () => {
    await request(app)
      .get('/api/events')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${'userToken'}`)
      .expect(401);
  });

  it('should get the events with valid token', async () => {
    await request(app)
      .get('/api/events')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
});
