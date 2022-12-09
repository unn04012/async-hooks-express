import { UserRepository } from './user-repository';

const instances: {
  userRepository: UserRepository | null;
} = {
  userRepository: null,
};

async function initRepositoryModule() {
  const userRepository = new UserRepository();

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
