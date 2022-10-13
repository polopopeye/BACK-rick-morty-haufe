import { RequestHandler } from 'express';
import { Router } from 'express-serve-static-core';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import appController from './app.controller';
import { favouriteModule } from './favourites/favourite.module';
import { characterModule } from './rickAndMorty/character.module';
import { userModule } from './users/users.module';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rick And Morty Backend API',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'],
};

export const appModule = (app: {
  use: (
    arg0: string,
    arg1: Router | RequestHandler[],
    arg2?: SwaggerOptions
  ) => void;
}) => {
  // Swagger Docs
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );
  // Swagger Docs

  // modules
  userModule(app);
  favouriteModule(app);
  characterModule(app);

  app.use('/', appController);
};
