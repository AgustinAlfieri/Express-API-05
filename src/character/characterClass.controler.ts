import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { CharacterClass } from './characterClass.entity.js';

const em = orm.em;
// em es el entity manager, que se encarga de interactuar con la base de datos
// y realizar operaciones CRUD (Create, Read, Update, Delete) sobre las entidades.

async function findAll(_: Request, res: Response) {
  try {
    const characterClasses = await em.find(CharacterClass, {});
    res.status(200).json({ message: 'Found all Character Classes', data: characterClasses });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const characterClass = await em.findOneOrFail(CharacterClass, { id });
    res.status(200).json({ message: 'Found Character Class', data: characterClass });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    // em.create es un método que crea una nueva entidad en la base de datos
    //Deberíamos validar/sanitizar el body antes de crear la entidad
    const characterClass = em.create(CharacterClass, req.body); // Operación sincrónica, no requiere await
    await em.flush(); // Guarda los cambios en la base de datos. Operación asíncrona, requiere await
    res.status(201).json({
      message: 'Character Class created',
      data: characterClass
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);

    //const characterClass = await em.findOneOrFail(CharacterClass, { id }); // Carga la entidad completa

    const characterClass = em.getReference(CharacterClass, id); // Obtiene una referencia a la entidad sin cargarla completamente
    // Esto se puede hacer porque characterClass no tiene ningún campo que sea un array o una relación con otra entidad
    // Si tuviera una relación con otra entidad, deberíamos usar findOneOrFail

    em.assign(characterClass, req.body); // Actualiza la entidad con los nuevos datos
    await em.flush(); // Guarda los cambios en la base de datos
    res.status(200).json({
      message: 'Character Class updated',
      data: characterClass
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  res.status(500).json({
    message: 'Not implemented'
  });
}

export { findAll, findOne, add, update, remove };
