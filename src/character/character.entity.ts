import { Entity, ManyToOne, ManyToMany, Property, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { CharacterClass } from './characterClass.entity.js';
import { Item } from './item.entity.js';

@Entity()
export class Character extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @ManyToOne(() => CharacterClass, { nullable: false })
  characterClass!: CharacterClass;

  @Property({ nullable: false })
  level!: number;

  @Property({ nullable: false })
  hp!: number;

  @Property({ nullable: false })
  mana!: number;

  @Property({ nullable: false })
  attack!: number;

  @ManyToMany(() => Item, (item) => item.characters, { cascade: [Cascade.ALL], owner: true })
  // owner: true significa que esta entidad es la dueña de la relación, es decir,
  // que se encargará de guardar la relación en la base de datos
  // Cascade.ALL significa que si se elimina un Character, se eliminarán todos los Items asociados
  items!: Item[];
}
