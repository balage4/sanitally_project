import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';


let registrationData;
let loginData;


beforeAll(async () => {
  await testdb();
  registrationData = {
    firstName: 'Joe',
    lastName: 'Doe',
    email: 'test@mail.com',
    password: 'asdFG77))',
  }
  loginData = {
    email: 'test@mail.com',
    password: 'asdFG77))',
  }
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('Login tests', () => {

  it('post:register via dummy', async () => {
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(registrationData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeTruthy();
  });

  it('should login success', async () => {
    const res = await request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(loginData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('should send error via invalid inputs', async () => {
    loginData.password = 'aaa888';
    const res = await request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(loginData);

    expect(res.statusCode).toBe(400);
    expect(res.error).toBeTruthy();

  });
});