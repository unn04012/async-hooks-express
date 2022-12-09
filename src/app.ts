import { generateHttpServerRunner } from './http-routes';

(async () => {
  const runner = generateHttpServerRunner();

  runner.run();

  console.log(`server up and running`);
})();
