import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';


let registrationData;

beforeAll(async () => {
  await testdb();
  registrationData = {
    firstName: "Joe",
    lastName: "Doe",
    email: "test@mail.com",
    password: "asdFG77))",
  }
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('mockTest', () => {
  test('test route sending', async () => {
    const response = await request(app).post('/api/test').send({
      email: 'test@test.com',
      password: 'testTEST*1'
    });
    expect(response.statusCode).toBe(200);
  })
})

describe('Registration test', () => {
  it("post:register", async () => {
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(registrationData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeTruthy();
  });

  it("post:register again with the same data", async () => {
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(registrationData);

    expect(res.statusCode).toBe(400);
    expect(res.error).toBeTruthy();
  });

  it("post:register with invalid password", async () => {
    registrationData.password = 'aaa';
    const res = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(registrationData);

    expect(res.statusCode).toBe(400);
    expect(res.error).toBeTruthy();
  });
});



