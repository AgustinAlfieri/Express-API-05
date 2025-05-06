import { Repository } from '../shared/repository.js';
import { Character } from './character.entity.js';
import { pool } from '../shared/db/conn.mysql.js'; // Importa la función pool desde el archivo db.js

export class CharacterRepository implements Repository<Character> {
  public async findAll(): Promise<Character[] | undefined> {
    const [characters] = await pool.query('SELECT * FROM characters');
    for (const character of characters as Character[]) {
      const [items] = await pool.query(
        'SELECT itemName FROM characterItems WHERE characterId = ?',
        [character.id]
      );
      character.items = (items as { itemName: string }[]).map(
        (item) => item.itemName
      );
    }
    return characters as Character[];
  }
  public async findOne(item: { id: string }): Promise<Character | undefined> {
    throw new Error('Method not implemented.'); // Lanza un error si se llama a este método}
  }
  public async add(item: Character): Promise<Character | undefined> {
    throw new Error('Method not implemented.'); // Lanza un error si se llama a este método}
  }
  public async update(
    id: string,
    item: Character
  ): Promise<Character | undefined> {
    throw new Error('Method not implemented.'); // Lanza un error si se llama a este método}
  }

  public async delete(item: { id: string }): Promise<Character | undefined> {
    throw new Error('Method not implemented.'); // Lanza un error si se llama a este método}
  }
}
