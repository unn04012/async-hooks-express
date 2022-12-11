import { RootConfig } from './configuration.types';

function readRootConfiguration(source: Record<string, string | undefined>): RootConfig {
  const mandatory = makeMandatoryReader(source);
  const optional = makeOptionalReader(source);

  return {
    mysql: {
      host: mandatory('MYSQL_HOST'),
      port: Number(mandatory('MYSQL_PORT')),
      user: mandatory('MYSQL_USER'),
      password: mandatory('MYSQL_PASSWORD'),
      database: mandatory('MYSQL_DATABASE'),
      poolSize: Number(optional('MYSQL_POOL_SIZE', '10')),
    },
    http: {
      port: Number(mandatory('HTTP_PORT')),
    },
  };
}

function makeMandatoryReader(source: Record<string, string | undefined>) {
  return (key: string) => {
    const found = source[key];
    if (!found) {
      throw new Error(`the env-variable: ${key} was not found`);
    }
    return found;
  };
}

function makeOptionalReader(source: Record<string, string | undefined>) {
  return (key: string, defaultValue: string) => {
    const found = source[key];
    if (!found) {
      return defaultValue;
    }
    return found;
  };
}

export { readRootConfiguration };
