import express from 'express';

import { requestContextStorageMiddleware } from '../middlewares/request-context-storage-middleware';
import { registerUserRoutes } from './user-routes';

function generateHttpServerRunner() {
  const application = express();

  application.use(express.json());
  application.use(requestContextStorageMiddleware());

  registerUserRoutes(application);

  return {
    run: () => application.listen(8080, () => console.log(`[${new Date().toISOString()}] api-server started on port:${8080}`)),
  };
}

export { generateHttpServerRunner };
