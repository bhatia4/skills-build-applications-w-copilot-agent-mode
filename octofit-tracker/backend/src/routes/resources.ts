import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response) => {
    response.json(await model.find().lean());
  });

  router.get('/:id', async (request, response) => {
    const resource = await model.findById(request.params.id).lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.post('/', async (request, response) => {
    const resource = await model.create(request.body);
    response.status(201).json(resource);
  });

  router.patch('/:id', async (request, response) => {
    const resource = await model
      .findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
      .lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.delete('/:id', async (request, response) => {
    const resource = await model.findByIdAndDelete(request.params.id).lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.status(204).send();
  });

  return router;
}