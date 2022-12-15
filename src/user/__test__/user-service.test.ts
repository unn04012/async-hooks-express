import { v4 } from 'uuid';
import { UserService } from '../user-service';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { UserSchema } from '../../schemas/user-schema';
import { UserPaymentService } from '../../payment/user-payment-service';
import * as Decorators from '../../decorators/transaction-context-decorator';

jest.mock('../../decorators/transaction-context-decorator', () => {
  return {
    Transaction: () => {},
  };
});

describe('user service test with decorator', () => {
  const randomId = v4();
  const mockedUserRepository = {
    createUser: async ({ name, nickname }): Promise<UserSchema> => {
      return {
        userId: randomId,
        nickname: 'mocked nickname',
      } as UserSchema;
    },

    updateUserName: async ({ userId, name }) => {
      return { userId, name } as UserSchema;
    },
  } as IUserRepository;

  const mockedUserPaymentRepository = {} as UserPaymentService;

  const userService = new UserService({ userPaymentService: mockedUserPaymentRepository, userRepository: mockedUserRepository });
  test('userId가 randomid가 같아야 한다. ', async () => {
    const user = await userService.createAndUpdateUser({ name: 'test mun', nickname: 'test nick' });
    console.log(user);
    expect(user.userId).toBe(randomId);
  });
});
