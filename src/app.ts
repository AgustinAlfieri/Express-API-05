import express, { NextFunction, Request, Response } from 'express';
import { Character } from './character.js';

// SSSSSSS

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

const characters = [
  new Character(
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad',
    'Darth Vader',
    'Sith',
    10,
    100,
    20,
    10,
    ['Lightsaber', 'Death Star']
  ),
];

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
  // Acá se debería validar el input, por ejemplo: Tipo de dato, que no haya malware, etc.
  // Vamos a utilizar posteriormente una librería para validar el input.

  next();
}

app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.get('/api/characters/:id', (req, res) => {
  const character = characters.find((c) => c.id === req.params.id);
  if (!character) {
    res.status(404).send({ message: 'Character not found' });
  }
  res.json(character);
});

app.post('/api/characters', sanitizeCharacterInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const id = crypto.randomUUID();
  const character = new Character(
    input.id,
    input.name,
    input.characterClass,
    input.level,
    input.hp,
    input.mana,
    input.attack,
    input.items
  );
  characters.push(character);
  res.status(201).send({ message: 'Character created', data: character });
});

app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  const characterIndex = characters.findIndex((c) => c.id === req.params.id);

  if (characterIndex === -1) {
    res.status(404).send({ message: 'Character not found' });
  }

  characters[characterIndex] = {
    ...characters[characterIndex],
    ...req.body.sanitizedInput,
  };
  res
    .status(200)
    .send({ message: 'Character updated', data: characters[characterIndex] });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
