import { NextFunction, Request, Response } from 'express';
import { Character } from './character.entity.js';
import { CharacterRepository } from './character.repository.js';

const repository = new CharacterRepository();

async function sanitizeCharacterInput(
  req: Request,
  _: Response,
  next: NextFunction
) {
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
  res.json({ data: await repository.findAll() });
}

async function findOne(req: Request, res: Response) {
  res.json({ data: await repository.findOne({ id: req.params.id }) });
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const characterInput = new Character(
    input.name,
    input.characterClass,
    input.level,
    input.hp,
    input.mana,
    input.attack,
    input.items
  );

  const character = await repository.add(characterInput);
  res
    .status(201)
    .json({ message: 'Character created succesfully', data: character });
  return;
}

async function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const character = await repository.update(req.body.sanitizedInput);

  if (!character) {
    res.status(404).json({ message: 'Character not found' });
    return;
  }
  res
    .status(200)
    .json({ message: 'Character updated succesfully', data: character });
  return;
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const character = await repository.delete({ id });

  if (!character) {
    res.status(404).json({ message: 'Character not found' });
    return;
  }
  res.status(200).json({ message: 'Character deleted succesfully' });
  return;
}

export { sanitizeCharacterInput, findAll, findOne, add, update, remove };
