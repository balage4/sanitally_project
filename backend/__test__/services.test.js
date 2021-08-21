/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import testdb from './test_db';
import app from '../src/app';
import { loginData } from './testData';
import { generateToken } from '../src/common/createToken';
import Service from '../src/models/Service';

const adminToken = generateToken(loginData.email, 'admin');
const userToken = generateToken('user@user.hu', 'user');


beforeAll(async () => {
  await testdb();
  await Service.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Services tests', () => {
  it('should refuse connect with invalid token', async () => {
    await request(app)
      .get('/api/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${'userToken'}`)
      .expect(401)
  });

  it('should get the services with valid token', async () => {
    await request(app)
      .get('/api/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)
  });

  it('should refuse creating service with invalid token', async () => {
    const newService = {
      serviceName: 'Gasztroenterológia',
      serviceNotes: 'werghucjsndkweorgfvcdfjg'
    }
    await request(app)
      .post('/api/admin/services/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newService)
      .expect(401);
  });

  it('should create new service successfully with admin-token', async () => {
    const newService = {
      serviceName: 'Gasztroenterológia',
      serviceNote: 'werghucjsndkweorgfvcdfjg'
    }
    await request(app)
      .post('/api/admin/services/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newService)
      .expect(201);
  });

  it('should refuse cfreate service with empty serviceNote field', async () => {
    const newService = {
      serviceName: 'Gasztroenterológia',
    }
    await request(app)
      .post('/api/admin/services/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newService)
      .expect(400);
  });

  it('should refuse create service with empty serviceName field', async () => {
    const newService = {
      serviceNote: 'dfgbhcxdfgrfbvcxsdf',
    }
    await request(app)
      .post('/api/admin/services/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newService)
      .expect(400);
  });

  it('should refuse create service with the same name', async () => {
    const newService = {
      serviceName: 'Gasztroenterológia',
      serviceNote: 'werghucjsndkweorgfvcdfjg'
    }
    const res = await request(app)
      .post('/api/admin/services/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newService)
      .expect(400);
    expect(res.error).toBeTruthy();
  });

  it('should return service by ID', async () => {

    const res = await request(app)
      .get('/api/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    const serviceId = res.body.services[0]._id;

    const resById = await request(app)
      .get(`/api/admin/services/${serviceId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    const singleService = resById.body.serviceData;

    expect(singleService).toBeTruthy();
    expect(singleService.serviceName).toBe('Gasztroenterológia');

  });

  it('should update service by ID success', async () => {

    const res = await request(app)
      .get('/api/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    const serviceId = res.body.services[0]._id;
    const update = {
      id: serviceId,
      updateData: {
        serviceName: 'Gasztroenterológia',
        serviceNote: 'gasztro enteriőr'
      }
    }
    const resById = await request(app)
      .put(`/api/admin/services/${serviceId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(update)
      .expect(200);

    expect(resById.body.message).toBeTruthy();
  });

  it('should refuse delete service by ID because user role', async () => {
    const res = await request(app)
      .get('/api/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    const serviceId = res.body.services[0]._id;

    await request(app)
      .delete(`/api/admin/services/${serviceId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(401);
  });

  it('should delete service by ID success, using admin role', async () => {
    const res = await request(app)
      .get('/api/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    const serviceId = res.body.services[0]._id;

    await request(app)
      .delete(`/api/admin/services/${serviceId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(202);
  });
});