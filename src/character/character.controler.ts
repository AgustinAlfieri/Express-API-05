import { NextFunction, Request, Response } from 'express';
import { Character } from './character.entity.js';

async function sanitizeCharacterInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    characterClass: req.body.characterClass,
    level: req.body.level,
    hp: req.body.hp,
    mana: req.body.mana,
    attack: req.body.attack,
    items: req.body.items
  };
  // Poner este check acá funciona para el patch pero genera problemas con el put porque es posible que se envíen valores undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      // Si el valor es undefined, lo eliminamos
      delete req.body.sanitizedInput[key];
    }
  });

  // Acá se debería validar el input, por ejemplo: Tipo de dato, que no haya malware, etc.
  // Vamos a utilizar posteriormente una librería para validar el input.

  next();
}

async function findAll(_: Request, res: Response) {
  res.status(500).json({
    message: 'Not implemented'
  });
}
async function findOne(req: Request, res: Response) {
  res.status(500).json({
    message: 'Not implemented'
  });
}

async function add(req: Request, res: Response) {
  res.status(500).json({
    message: 'Not implemented'
  });
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

export { sanitizeCharacterInput, findAll, findOne, add, update, remove };
