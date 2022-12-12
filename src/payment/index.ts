import { getRepository } from '../repositories';
import { getTypeOrmModule } from '../schemas';
import { UserPaymentService } from './user-payment-service';

const instances: { userPaymentService: UserPaymentService | null } = { userPaymentService: null };

async function initPaymentModule() {
  const userPaymentRepository = getRepository().userPaymentRepository();
  const dataSource = getTypeOrmModule().connection();
  const userPaymentService = new UserPaymentService({ userPaymentRepository, dataSource });

  instances.userPaymentService = userPaymentService;

  console.log(`[${new Date().toISOString()}] user module initialized`);
}

function getPaymentModule() {
  const getOrFail = <T>(getter: () => T | null, label: string) => {
    const got = getter();
    if (!got) {
      throw new Error(`there is no initialized module: ${label}`);
    }
    return got;
  };

  return {
    userPaymentService: () => getOrFail<UserPaymentService>(() => instances.userPaymentService, 'userPaymentService'),
  };
}

export { initPaymentModule, getPaymentModule };
