import { DefaultModuleLogger } from './logger-default';
import { ILoggerFactory, ILogger } from './logger-interface';

let loggerFactory: ILoggerFactory | null = null;

function initLoggerModule() {
  loggerFactory = (moduleName: string) => new DefaultModuleLogger(moduleName);
}

function getLogger(): ILoggerFactory {
  if (!loggerFactory) {
    throw new Error('logger module must be initialized');
  }
  return loggerFactory;
}

export { ILogger, initLoggerModule, getLogger };
