import { Repository } from '../shared/repository.js';
import { Character } from './character.entity.js';
import { pool } from '../shared/db/conn.mysql.js'; // Importa la función pool desde el archivo db.js
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class CharacterRepository implements Repository<Character> {
  public async findAll(): Promise<Character[] | undefined> {
    const [characters] = await pool.query('SELECT * FROM characters');
    for (const character of characters as Character[]) {
      const [items] = await pool.query('SELECT itemName FROM characterItems WHERE characterId = ?', [character.id]);
      character.items = (items as { itemName: string }[]).map((item) => item.itemName);
    }
    return characters as Character[];
  }
  public async findOne(item: { id: string }): Promise<Character | undefined> {
    const id = Number.parseInt(item.id);
    const [characters] = await pool.query<RowDataPacket[]>('SELECT * FROM characters WHERE id = ?', [id]);
    if (characters.length === 0) {
      return undefined;
    }
    const character = characters[0] as Character;
    const [items] = await pool.query('SELECT itemName FROM characterItems WHERE characterId = ?', [character.id]);
    character.items = (items as { itemName: string }[]).map((item) => item.itemName);
    return character;
  }
  public async add(characterInput: Character): Promise<Character | undefined> {
    const { id, items, ...characterRow } = characterInput;
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO characters SET ?', [characterRow]);
    characterInput.id = result.insertId;
    for (const item of items) {
      await pool.query('insert into characterItems set ?', { CharacterId: characterInput.id, itemName: item });
    }
    return characterInput;
  }
  public async update(id: string, characterInput: Character): Promise<Character | undefined> {
    const characterId = Number.parseInt(id);
    const { items, ...characterRow } = characterInput;
    await pool.query('UPDATE characters SET ? WHERE id = ?', [characterRow, characterId]);
    await pool.query('DELETE FROM characterItems WHERE characterId = ?', characterId);
    if (items?.length > 0) {
      for (const itemName of items) {
        await pool.query('INSERT INTO characterItems SET ?', { characterId, itemName });
      }
    }
    return await this.findOne({ id });
  }

  public async delete(item: { id: string }): Promise<Character | undefined> {
    try {
      const characterToDelete = await this.findOne(item);
      const characterId = Number.parseInt(item.id);
      await pool.query('DELeTE FROM characterItems WHERE characterId = ?', characterId);
      await pool.query('DELETE FROM characters WHERE id = ?', characterId);
      return characterToDelete;
    } catch (error: any) {
      throw new Error('Error deleting character');
    }
  }
}
