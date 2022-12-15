import { RequestHandler } from 'express';
import { nanoid } from 'nanoid';

import { requestAlsInstance, RequestAsyncaLocalContext, transactionAlsInstance } from '../async-storages/async-local-storages';
import { getLogger } from '../logger';

function requestContextStorageMiddleware(): RequestHandler {
  return async (req, res, next) => {
    const context = makeRequestContextPayload();
    const logger = getLogger()('Pre-Request');
    logger.info(`init request-id ${context.requestId}`);
    requestAlsInstance.run(context, () => {
      next();
    });
  };
}

function makeRequestContextPayload(): RequestAsyncaLocalContext {
  return {
    requestId: nanoid(),
  };
}

export { requestAlsInstance, transactionAlsInstance, requestContextStorageMiddleware, makeRequestContextPayload };
