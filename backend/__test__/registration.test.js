import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';

const regData = {
  firstName: 'Joe',
  lastName: 'Doe',
  email: 'admin@hello.hu',
  password: 'Admin79)',
}

const loginData = {
  email: 'admin@hello.hu',
  password: 'Admin79)',
}

beforeAll(async () => {
  await testdb();
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('mockTest', () => {
  test('test route sending', async () => {
    await request(app).post('/api/test').send({
      email: 'test@test.com',
      password: 'testTEST*1'
    })
      .expect(200);
  })
})

describe('Registration test', () => {
  it('should register success', async () => {
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(regData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeTruthy();
  });

  it('should refuse registration with invalid data', async () => {
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ email: 'xyyy', password: 'doeiruhf' });

    expect(res.statusCode).toBe(400);
    expect(res.error).toBeTruthy();
  });

  it('should refuse with invalid password', async () => {
    regData.password = 'aaa';
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(regData)
      .expect(400)
    expect(res.error).toBeTruthy();
  });
  it('should refuse with unused email', async () => {
    regData.email = 'test'
    regData.password = 'testTEST*1';
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(regData)
      .expect(400);
    expect(res.error).toBeTruthy();
  });

  it('should login success with valid data', async () => {
    const res = await request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(loginData)
      .expect(200)
    expect(res.body.token).toBeTruthy();
    expect(res.body.role).toBe('admin');
  });
});



