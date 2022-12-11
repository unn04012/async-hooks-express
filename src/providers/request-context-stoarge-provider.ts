import { AsyncLocalStorage } from 'async_hooks';
import { IContextStorageProvider } from './context-storage-provider.interface';

const storage = new AsyncLocalStorage<string>();

export class RequestContextStorageProvider implements IContextStorageProvider<string> {
  save(key: string): void {
    storage.enterWith(key);
  }

  get() {
    const requestContext = storage.getStore();

    return requestContext;
  }
}
