import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';
import { regData, loginData } from './testData';

beforeAll(async () => {
  await testdb();
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Login test', () => {

  it('should success register', async () => {
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(regData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeTruthy();
  });

  it('should refuse login by invalid data', async () => {
    await request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'joe@doe.com' })
      .expect(400);
  });

  it("login invalid data2", async () => {
    const mockLogin = {
      email: 'test@mail.com',
      password: 'FG77*',
    }
    await request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(mockLogin)
      .expect(400);
  });
  it("should login success", async () => {
    await request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(loginData)
      .expect(200);
  });
});
