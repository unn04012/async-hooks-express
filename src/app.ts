import { generateHttpServerRunner } from './http-routes';
import { initProviderModule } from './providers';
import { initRepositoryModule } from './repositories';
import { initUserModule } from './user';

(async () => {
  initProviderModule();
  initRepositoryModule();
  initUserModule();
  const runner = generateHttpServerRunner();

  runner.run();

  console.log(`[${new Date().toISOString()}] server up and running`);
})();
