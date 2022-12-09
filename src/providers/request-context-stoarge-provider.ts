import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { IContextStorageProvider } from './context-storage-provider.interface';

const storage = new AsyncLocalStorage<Request>();

export class RequestContextStorageProvider implements IContextStorageProvider<Request> {
  save(key: Request): void {
    storage.enterWith(key);
  }

  get(): Request | undefined {
    return storage.getStore();
  }
}
