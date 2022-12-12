import { getPaymentModule } from '../payment';
import { getRepository } from '../repositories';
import { getTypeOrmModule } from '../schemas';
import { UserService } from './user-service';

const instances: { userService: UserService | null } = { userService: null };

async function initUserModule() {
  const userPaymentService = getPaymentModule().userPaymentService();
  const userRepository = getRepository().userRepository();

  const dataSource = getTypeOrmModule().connection();

  const userService = new UserService({ userPaymentService, userRepository, dataSource });

  instances.userService = userService;

  console.log(`[${new Date().toISOString()}] user module initialized`);
}

function getUserModule() {
  const getOrFail = <T>(getter: () => T | null, label: string) => {
    const got = getter();
    if (!got) {
      throw new Error(`there is no initialized module: ${label}`);
    }
    return got;
  };

  return {
    userService: () => getOrFail<UserService>(() => instances.userService, 'userService'),
  };
}

export { getUserModule, initUserModule };
