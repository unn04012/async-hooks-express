import { AccessLogPayload } from './logger-types';

export type CriticalLogPayload = {
  url: string;
  error: Error;
  dateTime: string;
  isCritical: boolean;
};

export interface ILogger {
  /**
   * INFO level logs
   * @param args parameters
   */
  info(...args: any[]): void;

  /**
   * DEBUG level logs
   * @param args parameters
   */
  debug(...args: any[]): void;

  /**
   * ERROR level logs
   */
  error(payload: CriticalLogPayload): void;

  accesssLog(payload: AccessLogPayload): void;
}

export interface ILoggerFactory {
  (...args: any[]): ILogger;
}
