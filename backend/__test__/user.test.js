import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';
import { loginData } from './testData';
import { generateToken } from '../src/common/createToken';

const adminToken = generateToken(loginData.email, loginData.role);
const userToken = generateToken('user@user.hu', 'user');

const dummies = [
  {
    firstName: 'Joe',
    lastName: 'Doe',
    email: 'joe@hello.hu',
    password: 'Admin79)',
  },
  {
    firstName: 'Jane',
    lastName: 'Does',
    email: 'jane@hello.hu',
    password: 'Admin79)',
  },
  {
    firstName: 'Josh',
    lastName: 'Dot',
    email: 'josh@hello.hu',
    password: 'Admin79)',
  },
]

beforeAll(async () => {
  await testdb();
  await User.deleteMany();

  dummies.forEach(async (dummy) => {
    await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(dummy);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Users test', () => {

  it('should have users and services collection in the response', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
    expect(res.body.users).toBeTruthy();
    expect(res.body.services).toBeTruthy();
  });
  it('should get users and service data with another role', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)
    expect(res.body.users).toBeTruthy();
    expect(res.body.services).toBeTruthy();
  });
  it('should refuse request without token', async () => {
    await request(app)
      .get('/api/admin/users')
      .set('Content-Type', 'application/json')
      .expect(401);
  });
});