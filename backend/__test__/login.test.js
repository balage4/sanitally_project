import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import User from '../src/models/User';



let registrationData;
let token;

beforeAll(async () => {
  await testdb();

});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});