import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { appModule } from './app.module';

const app = express();

async function bootstrap(app: express.Application) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors());

  app.use(cookieParser());

  appModule(app);

  app.listen(process.env.PORT || 3001);
}

bootstrap(app);
