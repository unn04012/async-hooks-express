import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { initConfigurationModule } from './configurations';
import { generateHttpServerRunner } from './http-routes';
import { initPaymentModule } from './payment';
import { initProviderModule } from './providers';
import { initRepositoryModule } from './repositories';
import { initTypeOrmModule } from './schemas';
import { initUserModule } from './user';

(async () => {
  initializeTransactionalContext();
  initConfigurationModule();
  await initTypeOrmModule();
  initProviderModule();
  initRepositoryModule();
  initPaymentModule();
  initUserModule();

  const runner = generateHttpServerRunner();

  runner.run();

  console.log(`[${new Date().toISOString()}] server up and running`);
})();
