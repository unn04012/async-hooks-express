import { Application } from 'express';
import { requestContextStorageMiddleware } from '../middlewares/request-context-storage-middleware';
import { getProviderModule } from '../providers';
import { getUserModule } from '../user';

function registerUserRoutes(app: Application) {
  const { userService } = getUserModule();
  const { transactionContextStorageProvider } = getProviderModule();
  app.get('/:userId', requestContextStorageMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userService().findUser({ userId });

      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/user', async (req, res) => {
    try {
      const userData = { name: 'munninis', nickname: 'ninis' };
      const user = await userService().createAndUpdateUser(userData);

      return res.json(user);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  });

  app.post('/user/payment', async (req, res) => {
    try {
      const { name, nickname } = req.body;

      const user = await userService().createUserAndPayment({ name, nickname });

      return res.json(user);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  });
}

export { registerUserRoutes };
