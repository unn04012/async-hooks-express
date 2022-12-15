import { NextFunction, Request, RequestHandler, Response } from 'express';
import { nanoid } from 'nanoid';

import { getProviderModule } from '../providers';

export const requestContextStorageMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    const requestContextStorageProvider = getProviderModule().requestContextStorageProvider();
    const requestContextId = nanoid();
    requestContextStorageProvider.save(requestContextId);
    next();
  };
};
