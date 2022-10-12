import favouriteController from './controllers/favourite.controller';

export const favouriteModule = (app: {
  use: (arg0: string, arg1: import('express-serve-static-core').Router) => void;
}) => {
  app.use('/favourites', favouriteController);
};
