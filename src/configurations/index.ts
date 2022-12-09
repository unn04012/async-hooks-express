import 'dotenv/config';

import { readRootConfiguration } from './configuration-reader';
import { MysqlConfig, HttpConfig, RootConfig } from './configuration.types';

let configuration: RootConfig | null = null;

function initConfigurationModule() {
  configuration = readRootConfiguration(process.env);

  console.log(`[${new Date().toISOString()}] configuration module initialized`);
}

function getConfiguration() {
  const conf: RootConfig | null = configuration;
  if (!conf) {
    throw new Error('the configuration-module not have been initialized');
  }
  return {
    beconEnv: () => conf.beconEnv,
    mysql: () => conf.mysql,
    http: () => conf.http,
  };
}

export { initConfigurationModule, getConfiguration, RootConfig, MysqlConfig, HttpConfig };
