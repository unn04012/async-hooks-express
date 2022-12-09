import { Application } from 'express';
import { requestContextStorageMiddleware } from '../middlewares/request-context-storage-middleware';
import { getUserModule } from '../user';

function registerUserRoutes(app: Application) {
  const { userService } = getUserModule();
  app.get('/', requestContextStorageMiddleware, async (req, res) => {
    try {
      const userId = 'userId';
      const user = await userService().findUser({ userId });

      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
    }
  });
}

export { registerUserRoutes };
