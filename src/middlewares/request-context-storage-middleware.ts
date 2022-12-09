import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

import { getProviderModule } from '../providers';

export const requestContextStorageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestContextStorage = getProviderModule().requestContextStorageProvider();
    const contextId = nanoid();
    requestContextStorage.save(contextId);
    next();
  } catch (err) {
    next(err);
  }
};
