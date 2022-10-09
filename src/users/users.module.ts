import userController from './controllers/users.controller';

export const userModule = (app: {
  use: (arg0: string, arg1: import('express-serve-static-core').Router) => void;
}) => {
  app.use('/users', userController);
};
