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
  res.status(500).json({
    message: 'Not implemented'
  });
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
  res.status(500).json({
    message: 'Not implemented'
  });
}

async function remove(req: Request, res: Response) {
  res.status(500).json({
    message: 'Not implemented'
  });
}

export { findAll, findOne, add, update, remove };
