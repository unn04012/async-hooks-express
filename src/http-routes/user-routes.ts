import { Application } from 'express';

function registerUserRoutes(app: Application) {
  app.get('/', (req, res) => {
    req;
    res.status(200).json({ success: 'hello world' });
  });
}

export { registerUserRoutes };
