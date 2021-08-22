/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import { loginData, regData } from './testData';
import { generateToken } from '../src/common/createToken';
import Service from '../src/models/Service';
import User from '../src/models/User';

const userToken = generateToken('user@user.hu', 'user');


beforeAll(async () => {
  await testdb();
  await Service.deleteMany();
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Prescription tests', () => {
  it('should refuse invalid e-mail param', async () => {
    await request(app)
      .get('/api/prescriptions/hello@hello.hu')
      .set('Content-Type', 'application/json')
      .expect(401);
  });

  it('should refuse with invalid token', async () => {
    await request(app)
      .get('/api/prescriptions/hello@hello.hu')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${'userToken'}`)
      .expect(401);
  });

  it('should response server error, with valid token, but invalid email', async () => {
    await request(app)
      .get('/api/prescriptions/hello@hello.hu')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(500);
  });

  it('should create user for testing prescriptions', async () => {
    const register = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(regData)
      .expect(201);
    await expect(register.body).toBeTruthy();
  });

  it('should get prescriptions successfully', async () => {
    const prescriptions = await request(app)
      .get(`/api/prescriptions/${loginData.email}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(prescriptions.body).toBeTruthy();
  });

});
