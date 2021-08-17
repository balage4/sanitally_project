/* eslint-disable no-unused-vars */
import request from 'supertest';
import mongoose from 'mongoose';
import { response } from 'express';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';

let logged;
const registrationData = {
  firstName: 'Joe',
  lastName: 'Doe',
  email: 'test@mail.com',
  password: 'asdFG77))',
}
const loginData = {
  email: 'test@mail.com',
  password: 'asdFG77))',
}

beforeEach(async () => {
  await testdb();
});
afterEach(async () => {
  await mongoose.disconnect();
})

beforeAll(() => {
  request(app)
    .post('/api/register')
    .set('Content-Type', 'application/json')
    .send(registrationData)
    .then(() => {
      request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(loginData)
        .then((res) => {
          logged = res.user;
        });


    })

});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

it('should unauthorized response', async () => {
  const res = await request(app)
    .get('/api/admin/users')
    .set('Content-Type', 'application/json')
    .send(registrationData);

  expect(res.statusCode).toBe(401);
  expect(res.body).toBeTruthy();
});

it('should get the users', async () => {
  const res = await request(app)
    .get('/api/admin/users')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${logged.token}`)
    .send(registrationData);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeTruthy();
});

