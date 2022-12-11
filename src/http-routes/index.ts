import express from 'express';

import { registerUserRoutes } from './user-routes';

function generateHttpServerRunner() {
  const application = express();

  registerUserRoutes(application);

  return {
    run: () => application.listen(8080, () => console.log(`[${new Date().toISOString()}] api-server started on port:${8080}`)),
  };
}

export { generateHttpServerRunner };
