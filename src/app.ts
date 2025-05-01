import express from 'express';
import { Character } from './character.js';

const app = express();

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

app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
