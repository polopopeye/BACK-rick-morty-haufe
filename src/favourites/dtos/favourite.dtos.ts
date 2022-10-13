import mongoose, { Schema } from 'mongoose';
import { Favourite } from '../entities/favourite.entities';

const collection = 'favourites';

const FavouriteModel = mongoose.model<Favourite>(
  'Favorite',
  new Schema({
    userId: { type: String, required: true },
    characterId: { type: String, required: true },
    favourite: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }),
  collection
);

export default FavouriteModel;
