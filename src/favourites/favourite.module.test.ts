import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';
import randomObjectId from '../utils/randomUID';
import { UpdateFavourite } from './entities/favourite.entities';

import { favouriteModule } from './favourite.module';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
favouriteModule(app);
console.log('node env', process.env.NODE_ENV);

describe('int of => /users', () => {
  let userIdCreated = null;
  let characterIdCreated = null;
  let token = null;

  it('check creation of a favourite', async () => {
    const newFavourite: UpdateFavourite = {
      characterId: randomObjectId(),
      userId: randomObjectId(),
      favourite: true,
    };

    const res = await request(app).post('/favourite/').send(newFavourite);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('_id');

    userIdCreated = res.body.data.userId;
    characterIdCreated = res.body.data.characterId;
  });

  it('check get a favourite', async () => {
    const res = await request(app)
      .get(`/favourite`)
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
