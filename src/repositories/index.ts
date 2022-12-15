import { getProviderModule } from '../providers';
import { getTypeOrmModule } from '../schemas';
import { UserPaymentRepository } from './user-payment-repository';
import { UserRepository } from './user-repository';

const instances: {
  userRepository: UserRepository | null;
  userPaymentRepository: UserPaymentRepository | null;
} = {
  userRepository: null,
  userPaymentRepository: null,
};

async function initRepositoryModule() {
  const userModel = getTypeOrmModule().user();
  const userPaymentModel = getTypeOrmModule().userPayment();

  const userRepository = new UserRepository({ userModel });
  const userPaymentRepository = new UserPaymentRepository({ userModel, userPaymentModel });

  instances.userRepository = userRepository;
  instances.userPaymentRepository = userPaymentRepository;

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
    userPaymentRepository: () => getOrFail<UserPaymentRepository>(() => instances.userPaymentRepository, 'userPaymentRepository'),
  };
}

export { initRepositoryModule, getRepository };
