import { Document } from 'mongoose';

/**
 * @openapi
 * components:
 *    schemas:
 *     Favourite:
 *      type: object
 *      properties:
 *       userId:
 *        type: string
 *        description: Id of the user who created the favourite
 *       characterId:
 *        type: string
 *        description: Id of the character that was favourited
 *       favourite:
 *        type: boolean
 *        description: Whether the character was favourited or not
 */
export interface Favourite extends Document {
  userId: string;
  characterId: string;
  favourite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateFavourite = Partial<Favourite>;

// TODO: add joi validations
