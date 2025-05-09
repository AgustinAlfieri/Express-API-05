import { Entity, ManyToMany, Property, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Character } from './character.entity.js';

@Entity()
export class Item extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;
  @Property()
  description!: string;

  @ManyToMany(() => Character, (character) => character.items)
  characters = new Collection<Character>(this);
  // ManyToMany es una relación muchos a muchos, en este caso un Item puede tener muchos Characters y un Character puede tener muchos Items
}
