import { RequestContextStorageProvider } from './request-context-stoarge-provider';
import { TransactionContextStorageProvider } from './transaction-context-storage-provider';

const instances: {
  requestContextStorageProvider: RequestContextStorageProvider | null;
  transactionContextStorageProvider: TransactionContextStorageProvider | null;
} = { requestContextStorageProvider: null, transactionContextStorageProvider: null };

async function initProviderModule() {
  const requestContextStorageProvider = new RequestContextStorageProvider();
  const transactionContextStorageProvider = new TransactionContextStorageProvider();

  instances.requestContextStorageProvider = requestContextStorageProvider;
  instances.transactionContextStorageProvider = transactionContextStorageProvider;

  console.log(`[${new Date().toISOString()}] provider module initialized`);
}

function getProviderModule() {
  const getOrFail = <T>(getter: () => T | null, label: string) => {
    const got = getter();
    if (!got) {
      throw new Error(`there is no initialized module: ${label}`);
    }
    return got;
  };

  return {
    requestContextStorageProvider: () =>
      getOrFail<RequestContextStorageProvider>(() => instances.requestContextStorageProvider, 'requestContextStorageProvider'),

    transactionContextStorageProvider: () =>
      getOrFail<TransactionContextStorageProvider>(() => instances.transactionContextStorageProvider, 'transactionContextStorageProvider'),
  };
}

export { initProviderModule, getProviderModule };
