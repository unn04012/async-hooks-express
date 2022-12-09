import { RequestContextStorageProvider } from './request-context-stoarge-provider';

const instances: { requestContextStorageProvider: RequestContextStorageProvider | null } = { requestContextStorageProvider: null };

async function initProviderModule() {
  const requestContextStorageProvider = new RequestContextStorageProvider();

  instances.requestContextStorageProvider = requestContextStorageProvider;
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
  };
}

export { initProviderModule, getProviderModule };
