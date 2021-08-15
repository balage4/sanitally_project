import request from 'supertest';

import app from '../src/app';

describe('POST /api/test', () => {

  describe('given an email address and a password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/test').send({
        email: 'test@test.com',
        password: 'testTEST*1'
      });
      expect(response.statusCode).toBe(200);
    })
  })
})
