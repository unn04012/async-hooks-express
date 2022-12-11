import { AsyncLocalStorage } from 'async_hooks';
import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import { IContextStorageProvider } from './context-storage-provider.interface';

const storage = new AsyncLocalStorage<{ entityManager: EntityManager; id: string }>();

export class TransactionContextStorageProvider implements IContextStorageProvider<EntityManager> {
  save(entityManager: EntityManager): void {
    const id = v4();
    console.log('entityManager id : ', id);
    storage.enterWith({ entityManager, id });
  }

  get() {
    const storedContext = storage.getStore();
    if (storedContext) {
      const { id, entityManager } = storedContext;
      console.log('stored entity manager id :', id);
      return entityManager;
    }
    return undefined;
  }
}
