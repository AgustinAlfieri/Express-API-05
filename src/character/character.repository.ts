import { Repository } from '../shared/repository.js';
import { Character } from './character.entity.js';

const characters = [
  new Character(
    'Darth Vader',
    'Sith',
    10,
    100,
    20,
    10,
    ['Lightsaber', 'Death Star'],
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
];

export class CharacterRepository implements Repository<Character> {
  public findAll(): Character[] | undefined {
    return characters; // Devuelve todos los personajes
  }
  public findOne(item: { id: string }): Character | undefined {
    return characters.find((c) => c.id === item.id); // Busca un personaje por su id
  }
  public add(item: Character): Character | undefined {
    characters.push(item); // Agrega un nuevo personaje a la lista
    return item; // Devuelve el personaje agregado
  }
  public update(item: Character): Character | undefined {
    const characterIndex = characters.findIndex((c) => c.id === item.id); // Busca el índice del personaje a actualizar
    if (characterIndex !== -1) {
      characters[characterIndex] = { ...characters[characterIndex], ...item }; // Actualiza el personaje en la lista
      return item; // Devuelve el personaje actualizado
    } else {
      return undefined; // Si no lo encuentra, devuelve undefined
    }
  }
  public delete(item: { id: string }): Character | undefined {
    const characterIndex = characters.findIndex((c) => c.id === item.id); // Busca el índice del personaje a eliminar
    if (characterIndex !== -1) {
      const deletedCharacter = characters[characterIndex]; // Guarda el personaje a eliminar
      characters.splice(characterIndex, 1); // Elimina el personaje de la lista
      return deletedCharacter; // Devuelve el personaje eliminado
    } else {
      return undefined; // Si no lo encuentra, devuelve undefined
    }
  }
}
