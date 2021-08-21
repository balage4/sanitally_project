/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import Category from '../src/models/Category';
import { generateToken } from '../src/common/createToken';
import { loginData } from './testData';

const adminToken = generateToken(loginData.email, 'admin');
const userToken = generateToken('user@user.hu', 'user');

beforeAll(async () => {
  await testdb();
  await Category.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Initialize categroies', () => {
  it('should successfully create Category collection with defult data', async () => {
    const res = await request(app)
      .post('/api/categories/init')
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(res.body).toBeTruthy();
    expect(res.body).toBe('Sikeres alaphelyzetbe állítás.');
  });

  it('should have 3 categories by default', async () => {
    const res = await request(app)
      .get('/api/categories')
    expect(200);
    expect(res.body.length).toBe(3);
  });

  it('should refuse update category by user role', async () => {

    const res = await request(app)
      .get('/api/categories');
    const updateId = res.body[0]._id;

    const putData = {
      id: updateId,
      categoryName: 'Módosított kategória',
      categoryNotes: 'új leírása a kategóriának'
    }

    await request(app)
      .get('/api/admin/categories')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .send(putData)
    expect(401);
  });
  it('should success update one category', async () => {

    const res = await request(app)
      .get('/api/categories');
    const updateId = res.body[0]._id;

    const putData = {
      id: updateId,
      categoryName: 'Módosított kategória',
      categoryNotes: 'új leírása a kategóriának'
    }

    await request(app)
      .get('/api/admin/categories')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(putData)
    expect(201);
  });
});