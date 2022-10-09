import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { appModule } from './app.module';

async function bootstrap() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  appModule(app);

  app.listen(process.env.PORT || 3001);
}

bootstrap();
