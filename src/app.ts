import { initConfigurationModule } from './configurations';
import { generateHttpServerRunner } from './http-routes';
import { initProviderModule } from './providers';
import { initRepositoryModule } from './repositories';
import { initTypeOrmModule } from './schemas';
import { initUserModule } from './user';

(async () => {
  initConfigurationModule();
  await initTypeOrmModule();
  initProviderModule();
  initRepositoryModule();
  initUserModule();
  const runner = generateHttpServerRunner();

  runner.run();

  console.log(`[${new Date().toISOString()}] server up and running`);
})();
