import { Cascade, Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { Character } from './character.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class CharacterClass extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;

  @Property()
  description!: string;

  @OneToMany(() => Character, (character) => character.characterClass, { cascade: [Cascade.ALL] })
  // Cascade.ALL significa que si se elimina un CharacterClass, se eliminarán todos los Characters asociados
  // OneToMany es una relación uno a muchos, en este caso un CharacterClass puede tener muchos Characters
  characters = new Collection<Character>(this);
  // Collection es una clase de MikroORM que representa una colección de entidades
}
