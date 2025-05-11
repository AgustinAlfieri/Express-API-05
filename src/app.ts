import 'reflect-metadata';
import express from 'express';
import { characterRouter } from './character/character.routes.js';
import { characterClassRouter } from './character/characterClass.routes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';

const app = express();
app.use(express.json());

// Luego de los middlewares base

app.use((req, res, next) => {
  //                       .em es el entity manager
  RequestContext.create(orm.em, next);
});
// Antes de las rutas y middlewares de negocio

app.use('/api/characters/classes', characterClassRouter);
app.use('/api/characters', characterRouter);

app.use((_, res) => {
  res.status(404).send({ message: 'Resource not found' });
  return;
});

await syncSchema(); // Never in production
// SyncSchema es una función que se encarga de sincronizar la base de datos con el esquema definido en las entidades

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
