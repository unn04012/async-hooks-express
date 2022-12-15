import { Application } from 'express';
import { requestContextStorageMiddleware } from '../middlewares/request-context-storage-middleware';
import { getUserModule } from '../user';
import { wrapAsync } from '../util/wrap-async';

function registerUserRoutes(app: Application) {
  const { userService } = getUserModule();
  app.get('/:userId', requestContextStorageMiddleware, async (req, res) => {
    const { userId } = req.params;
    const user = await userService().findUser({ userId });

    return user;
  });

  app.post('/user', async (req, res) => {
    try {
      const userData = { name: 'munninis', nickname: 'ninis' };
      const user = await userService().createAndUpdateUser(userData);

      return user;
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  });

  app.post(
    '/user/payment',
    wrapAsync(async (req, res) => {
      const { name, nickname } = req.body;

      const user = await userService().createUserAndPayment({ name, nickname });

      return user;
    })
  );
}

export { registerUserRoutes };
