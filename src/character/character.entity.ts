import { ObjectId } from 'mongodb';
import crypto from 'node:crypto';

export class Character {
  constructor(
    public name: string,
    public characterClass: string,
    public level: number,
    public hp: number,
    public mana: number,
    public attack: number,
    public items: string[],
    // The _id field is used by MongoDB to uniquely identify documents in a collection
    // the ? operator is used to indicate that this field is optional
    public _id?: ObjectId
  ) {}
}
