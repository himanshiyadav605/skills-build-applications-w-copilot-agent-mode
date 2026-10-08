import { isValidObjectId, type Model } from 'mongoose';
import { Router } from 'express';

export function createResourceRouter<T>(resource: Model<T>, sort?: Record<string, 1 | -1>) {
  const router = Router();

  router.get('/', async (_request, response) => {
    const records = await resource.find().sort(sort).lean().exec();
    response.json(records);
  });

  router.get('/:id', async (request, response) => {
    const { id } = request.params;
    if (!isValidObjectId(id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const record = await resource.findById(id).lean().exec();
    if (!record) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.json(record);
  });

  return router;
}
