import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';

import { userModule } from './users.module';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
userModule(app);

describe('int of => /users', () => {
  let userIdCreated = null;
  let emailCreated = null;
  let token = null;

  it('check creation of an user', async () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const newUser = {
      name: 'test' + randomNumber,
      email: randomNumber + '@test.com',
      birthDate: '2022-10-09',
      password: '123',
    };

    const res = await request(app).post('/users/').send(newUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('_id');

    userIdCreated = res.body.data._id;
    emailCreated = res.body.data.email;
  });

  it('check the login connection', async () => {
    const loginCredentials = {
      email: emailCreated,
      password: '123',
    };
    const res = await request(app).post('/login').send(loginCredentials);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('check find all users', async () => {
    const res = await request(app)
      .get('/users')
      .query({ limit: 3, offset: 0 })
      .set('Cookie', `token=${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('check get info of the created user', async () => {
    const res = await request(app)
      .get(`/users/${userIdCreated}`)
      .set('Cookie', `token=${token}`);

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
    const res = await request(app)
      .put(`/users/${userIdCreated}`)
      .send(newUser)
      .set('Cookie', `token=${token}`);

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
    const res = await request(app)
      .delete(`/users/${userIdCreated}`)
      .set('Cookie', `token=${token}`);

    expect(res.statusCode).toBe(200);
  });
});
