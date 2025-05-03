import express, { NextFunction, Request, Response } from 'express';
import { Character } from './character/character.entity.js';
import { CharacterRepository } from './character/character.repository.js';

const app = express();

// Middleware para parsear el cuerpo de las peticiones como JSON
// user --> request --> express ~~> middleware que forme req.body (El express.json) --> app.post (req.body) --> response --> user
app.use(express.json());

// get -> obtener información sobre recursos
// post -> crear un nuevo recurso
// delete -> eliminar un recurso
// put & patch -> modificar un recurso

// character -> /api/characters/
// Ejemplos de rutas:
// get /api/characters/ -> obtener todos los characters
// get /api/characters/:id -> obtener el characters con el id :id
// post /api/characters/ -> crear un nuevo character
// delete /api/characters/:id -> eliminar el character con el id :id
// put & patch /api/characters/:id -> modificar el character con el id :id

const repository = new CharacterRepository();

function sanitizeCharacterInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    characterClass: req.body.characterClass,
    level: req.body.level,
    hp: req.body.hp,
    mana: req.body.mana,
    attack: req.body.attack,
    items: req.body.items,
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

app.get('/api/characters', (_, res) => {
  res.json({ data: repository.findAll() });
});

app.get('/api/characters/:id', (req, res) => {
  res.json({ data: repository.findOne({ id: req.params.id }) });
});

app.post('/api/characters', sanitizeCharacterInput, (req, res) => {
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
  repository.add(characterInput);
  res.status(201).send({ message: 'Character created', data: characterInput });
  return;
});

app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id; // Agregamos el id al input para poder actualizar el personaje
  const character = repository.update(req.body.sanitizedInput);

  if (!character) {
    res.status(404).send({ message: 'Character not found' });
    return;
  }

  res.status(200).send({ message: 'Character updated', data: character });
  return;
});

app.patch('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id; // Agregamos el id al input para poder actualizar el personaje
  const character = repository.update(req.body.sanitizedInput);

  if (!character) {
    res.status(404).send({ message: 'Character not found' });
    return;
  }

  res.status(200).send({ message: 'Character updated', data: character });
  return;
});

app.delete('/api/characters/:id', (req, res) => {
  const character = repository.delete({ id: req.params.id });
  if (!character) {
    res.status(404).send({ message: 'Character not found' });
    return;
  } else {
    res.status(200).send({ message: 'Character deleted' });
    return;
  }
});

app.use((_, res) => {
  res.status(404).send({ message: 'Resource not found' });
  return;
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
