import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Item } from './item.entity.js';

const em = orm.em;

async function findAll(_: Request, res: Response) {
  try {
    const items = await em.find(Item, {});
    res.status(200).json({ message: 'Found all Items', data: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const item = await em.findOneOrFail(Item, { id });
    res.status(200).json({ message: 'Found Item', data: item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const item = em.create(Item, req.body);
    await em.flush();
    res.status(201).json({
      message: 'Character Class created',
      data: item
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const item = em.getReference(Item, id);
    em.assign(item, req.body);
    await em.flush();
    res.status(200).json({
      message: 'Item updated',
      data: item
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const item = em.getReference(Item, id);
    await em.removeAndFlush(item);
    res.status(200).json({
      message: 'Item deleted'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
