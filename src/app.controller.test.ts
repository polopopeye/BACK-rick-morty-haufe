import express from 'express';
import request from 'supertest';
import appController from './app.controller';

const app = express();
app.use('/', appController);

describe('Check propper Initialization', function () {
  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(
      JSON.stringify({ message: 'Hi!! You can go to /docs to see the swagger' })
    );
  });
});
