import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';

import { userModule } from './users.module';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
userModule(app);

describe('int of => /users', () => {
  let userIdCreated = null;

  it('check ini: should return 200 OK', async () => {
    const res = await request(app).get('/users').query({ limit: 3, offset: 0 });
    expect(res.statusCode).toBe(200);
  });

  it('check creation of an user', async () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const newUser = {
      name: 'test' + randomNumber,
      email: randomNumber + '@test.com',
      birthDate: '2022-10-09',
      password: '123',
    };

    const res = await request(app)
      .post('/users/')
      .send(JSON.stringify(newUser))
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('_id');

    userIdCreated = res.body.data._id;
  });

  it('check get info of the created user', async () => {
    const res = await request(app).get(`/users/${userIdCreated}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.data).toHaveProperty('password');
    expect(res.body.data).toHaveProperty('birthDate');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.data).toHaveProperty('updatedAt');
  });

  it('check update of the created user', async () => {
    const newUser = {
      name: 'test modified',
      password: 'test2',
      birthDate: '1990-01-01',
    };
    const res = await request(app).put(`/users/${userIdCreated}`).send(newUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.data).toHaveProperty('password');
    expect(res.body.data).toHaveProperty('birthDate');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.data).toHaveProperty('updatedAt');
  });

  it('check deletion of created user', async () => {
    const res = await request(app).delete(`/users/${userIdCreated}`);

    expect(res.statusCode).toBe(200);
  });
});
