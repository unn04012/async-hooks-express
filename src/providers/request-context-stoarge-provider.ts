import { AsyncLocalStorage, executionAsyncId, executionAsyncResource, AsyncResource } from 'async_hooks';
import { IContextStorageProvider } from './context-storage-provider.interface';

const storage = new AsyncLocalStorage<string>();

export class RequestContextStorageProvider implements IContextStorageProvider<string> {
  save(key: string): void {
    storage.enterWith(key);
    console.log(executionAsyncId());
    // console.log(executionAsyncResource());
  }

  get(): string | undefined {
    return storage.getStore();
  }
}
