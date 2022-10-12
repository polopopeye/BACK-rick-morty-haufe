import userController from './controllers/users.controller';
import loginController from './controllers/login.controller';

export const userModule = (app: {
  use: (arg0: string, arg1: import('express-serve-static-core').Router) => void;
}) => {
  app.use('/users', userController);
  app.use('/', loginController);
};
