const { v4 } = require('uuid');
const { UserService } = require('../user-service');
describe('user service test with decorator', () => {
  const randomId = v4();
  const mockedUserRepository = {
    createUser: async ({ name, nickname }) => {
      return {
        userId: randomId,
        nickname: 'mocked nickname',
      };
    },
  };

  const mockedUserPaymentRepository = {
    updateUserName: async ({ userId, name }) => {
      return {};
    },
  };

  const userService = new UserService({ userPaymentService: mockedUserPaymentRepository, userRepository: mockedUserRepository });
  test('userId가 randomid가 나와야 한다. ', async () => {
    const user = await userService.createAndUpdateUser();
  });
});
