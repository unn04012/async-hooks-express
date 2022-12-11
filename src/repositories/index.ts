import { getProviderModule } from '../providers';
import { getTypeOrmModule } from '../schemas';
import { UserRepository } from './user-repository';

const instances: {
  userRepository: UserRepository | null;
} = {
  userRepository: null,
};

async function initRepositoryModule() {
  const userModel = getTypeOrmModule().user();
  const transactionContextStorageProvider = getProviderModule().transactionContextStorageProvider();

  const userRepository = new UserRepository({ userModel, transactionContextStorageProvider });

  instances.userRepository = userRepository;

  console.log(`[${new Date().toISOString()}] repository module initialized`);
}

function getRepository() {
  const getOrFail = <T>(getter: () => T | null, label: string) => {
    const got = getter();
    if (!got) {
      throw new Error(`there is no initialized module: ${label}`);
    }
    return got;
  };

  return {
    userRepository: () => getOrFail<UserRepository>(() => instances.userRepository, 'userRepository'),
  };
}

export { initRepositoryModule, getRepository };
