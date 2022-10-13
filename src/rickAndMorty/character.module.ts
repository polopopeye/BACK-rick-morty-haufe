import characterController from './controllers/character.controller';

export const characterModule = (app: {
  use: (arg0: string, arg1: import('express-serve-static-core').Router) => void;
}) => {
  app.use('/character', characterController);
};
