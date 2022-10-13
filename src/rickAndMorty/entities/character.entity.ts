/**
 * @openapi
 * components:
 *    schemas:
 *     FilterCharacter:
 *      type: object
 *      properties:
 *       name:
 *        type: string
 *        description: Name of the character
 *        example: Rick Sanchez
 *       status:
 *        type: string
 *        description: Status of the character
 *        example: Alive
 *       species:
 *        type: string
 *        description:  Species of the character
 *        example:  Human
 *       type:
 *        type: string
 *        description: Type of the character
 *        example:  Human
 *       gender:
 *        type: string
 *        description: Gender of the character
 *        example: Male
 */
export interface FilterCharacter {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}
