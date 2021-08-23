/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import { loginData, regData } from './testData';
import { generateToken } from '../src/common/createToken';
import User from '../src/models/User';
import Prescription from '../src/models/Prescription';

const userToken = generateToken('user@user.hu', 'user');
const adminToken = generateToken('user@user.hu', 'admin');
const providerToken = generateToken('user@user.hu', 'provider');


beforeAll(async () => {
  await testdb();
  await Prescription.deleteMany();
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

  it('should get prescriptions by e-mail, successfully', async () => {
    const prescriptions = await request(app)
      .get(`/api/prescriptions/${loginData.email}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(prescriptions.body).toBeTruthy();
  });

  it('should refuse get all prescriptions, with invalid token', async () => {
    await request(app)
      .get(`/api/prescriptions`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(401);
  });

  it('should get prescriptions all, successfully', async () => {
    const prescriptions = await request(app)
      .get(`/api/prescriptions`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(prescriptions.body).toBeTruthy();
  });

  it('should create provider', async () => {

    const provider = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'provider@hello.hu',
      password: 'Provider79)',
    }

    const register = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(provider)
      .expect(201);
    await expect(register.body).toBeTruthy();
  });
  it('should create prescription successully', async () => {
    await request(app)
      .post('/api/prescriptions/')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        prescriptionFor: 'abcdefg',
        prescriptionVaccine: 'vaccine',
        prescriptionDosage: 'dosage',
        prescriptionFrom: 'dfgbvcfg'
      })
    expect(201);
  })
  it('should refuse with some empty fields', async () => {
    await request(app)
      .post('/api/provider/prescriptions/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        prescriptionFor: 'abcdefg',
        prescriptionFrom: 'dfgbvcfg'
      })
      .expect(500);
  })
});
