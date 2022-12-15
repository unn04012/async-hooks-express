import { requestAlsInstance } from '../async-storages/async-local-storages';
import { CriticalLogPayload, ILogger } from './logger-interface';
import { AccessLogPayload } from './logger-types';

export class DefaultModuleLogger implements ILogger {
  private _moduleName: string;

  constructor(moduleName: string) {
    this._moduleName = moduleName;
  }

  public info(...args: any[]): void {
    console.log(`[${this._simpleTimeExpr()}/INF/${this._moduleName}] request-id:${this._getRequestId()}`, ...args);
  }

  public debug(...args: any[]): void {
    console.log(`${this._simpleTimeExpr()}/DBG/${this._moduleName}] request-id:${this._getRequestId()}`, ...args);
  }

  public error({ url, error, dateTime, isCritical = false }: CriticalLogPayload): void {
    if (isCritical) {
      // send to other notification service
    }
    console.error(`[${this._simpleTimeExpr()}/ERR/${this._moduleName}] request-id:${this._getRequestId()}`, error.stack);
  }

  public accesssLog(payload: AccessLogPayload): void {
    const requestId = this._getRequestId();
    console.log(
      JSON.stringify({
        requestId,
        type: 'accesslog',
        requestedAt: new Date().toISOString(),
        ...payload,
      })
    );
  }

  private _simpleTimeExpr() {
    return new Date().toISOString();
  }

  private _getRequestId() {
    const requestContext = requestAlsInstance.getStore();
    return requestContext ? requestContext.requestId : null;
  }
}
