import express from 'express';

import { registerUserRoutes } from './user-routes';

declare module 'express-serve-static-core' {
  interface Request {
    context: {
      id: string;
    };
  }
}

function generateHttpServerRunner() {
  const application = express();

  registerUserRoutes(application);

  return {
    run: () => application.listen(8080, () => console.log(`[${new Date().toISOString()}] api-server started on port:${8080}`)),
  };
}

export { generateHttpServerRunner };
