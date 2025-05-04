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
  )
];

//async hace que la función devuelva una promesa, lo que significa que puede realizar operaciones asíncronas dentro de ella.
//await se utiliza para esperar a que una promesa se resuelva antes de continuar con la ejecución del código.
// Una función asíncrona es una función que devuelve una promesa y puede contener la palabra clave await dentro de su cuerpo.
// La función asíncrona se utiliza para realizar operaciones que pueden tardar un tiempo en completarse,
// como la lectura de archivos, la consulta a una base de datos o la llamada a una API externa.

export class CharacterRepository implements Repository<Character> {
  public async findAll(): Promise<Character[] | undefined> {
    return await characters; // Devuelve todos los personajes
  }
  public async findOne(item: { id: string }): Promise<Character | undefined> {
    return await characters.find((c) => c.id === item.id); // Busca un personaje por su id
  }
  public async add(item: Character): Promise<Character | undefined> {
    characters.push(item); // Agrega un nuevo personaje a la lista
    return await item; // Devuelve el personaje agregado
  }
  public async update(item: Character): Promise<Character | undefined> {
    const characterIndex = characters.findIndex((c) => c.id === item.id); // Busca el índice del personaje a actualizar
    if (characterIndex !== -1) {
      characters[characterIndex] = { ...characters[characterIndex], ...item }; // Actualiza el personaje en la lista
      return await item; // Devuelve el personaje actualizado
    } else {
      return await undefined; // Si no lo encuentra, devuelve undefined
    }
  }
  public async delete(item: { id: string }): Promise<Character | undefined> {
    const characterIndex = characters.findIndex((c) => c.id === item.id); // Busca el índice del personaje a eliminar
    if (characterIndex !== -1) {
      const deletedCharacter = characters[characterIndex]; // Guarda el personaje a eliminar
      characters.splice(characterIndex, 1); // Elimina el personaje de la lista
      return await deletedCharacter; // Devuelve el personaje eliminado
    } else {
      return await undefined; // Si no lo encuentra, devuelve undefined
    }
  }
}
