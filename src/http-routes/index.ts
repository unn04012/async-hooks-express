import express from 'express';
import { errorHandler } from '../middlewares/error-middleware';

import { requestContextStorageMiddleware } from '../middlewares/request-context-storage-middleware';
import { responseOverrideMiddleware, responsePostOverrideMiddleware } from '../middlewares/response-override-middleware';
import { registerUserRoutes } from './user-routes';

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
  }
  interface Response {
    result: {
      success(payload: { json?: any; text?: string }): void;
      failure(fail: {
        json?: {
          code: string;
          message: string;
        };
        text?: string;
        status?: number;
      }): void;
    };
  }
}

function generateHttpServerRunner() {
  const application = express();

  application.use(express.json());

  application.use(responseOverrideMiddleware());

  application.use(requestContextStorageMiddleware());
  registerUserRoutes(application);

  application.use(errorHandler);

  application.use(responsePostOverrideMiddleware());

  return {
    run: () => application.listen(8080, () => console.log(`[${new Date().toISOString()}] api-server started on port:${8080}`)),
  };
}

export { generateHttpServerRunner };
