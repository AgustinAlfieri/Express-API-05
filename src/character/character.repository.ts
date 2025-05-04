import { Repository } from '../shared/repository.js';
import { Character } from './character.entity.js';
import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';

const charactersArray = [
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

const characters = db.collection<Character>('characters'); // Colección de personajes en la base de datos

//async hace que la función devuelva una promesa, lo que significa que puede realizar operaciones asíncronas dentro de ella.
//await se utiliza para esperar a que una promesa se resuelva antes de continuar con la ejecución del código.
// Una función asíncrona es una función que devuelve una promesa y puede contener la palabra clave await dentro de su cuerpo.
// La función asíncrona se utiliza para realizar operaciones que pueden tardar un tiempo en completarse,
// como la lectura de archivos, la consulta a una base de datos o la llamada a una API externa.

export class CharacterRepository implements Repository<Character> {
  public async findAll(): Promise<Character[] | undefined> {
    return await characters.find().toArray(); // Devuelve todos los personajes
  }
  public async findOne(item: { id: string }): Promise<Character | undefined> {
    const _id = new ObjectId(item.id); // Convierte el id a un ObjectId
    return (await characters.findOne({ _id })) || undefined; // Busca un personaje por su id
  }
  public async add(item: Character): Promise<Character | undefined> {
    item._id = (await characters.insertOne(item)).insertedId; // Inserta un nuevo personaje en la base de datos y obtiene su _id
    return await item; // Devuelve el personaje insertado
  }
  public async update(item: Character): Promise<Character | undefined> {
    const characterIndex = charactersArray.findIndex((c) => c.id === item.id); // Busca el índice del personaje a actualizar
    if (characterIndex !== -1) {
      charactersArray[characterIndex] = {
        ...charactersArray[characterIndex],
        ...item
      }; // Actualiza el personaje en la lista
      return await item; // Devuelve el personaje actualizado
    } else {
      return await undefined; // Si no lo encuentra, devuelve undefined
    }
  }
  public async delete(item: { id: string }): Promise<Character | undefined> {
    const characterIndex = charactersArray.findIndex((c) => c.id === item.id); // Busca el índice del personaje a eliminar
    if (characterIndex !== -1) {
      const deletedCharacter = charactersArray[characterIndex]; // Guarda el personaje a eliminar
      charactersArray.splice(characterIndex, 1); // Elimina el personaje de la lista
      return await deletedCharacter; // Devuelve el personaje eliminado
    } else {
      return await undefined; // Si no lo encuentra, devuelve undefined
    }
  }
}
