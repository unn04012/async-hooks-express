import { DataSource } from 'typeorm';
import { transactionContextIntercepter } from '../decorators/transaction-context-decorator';
import { UserPaymentService } from '../payment/user-payment-service';
import { IUserRepository } from '../repositories/user-repository.interface';

export class UserService {
  private _userRepository: IUserRepository;
  private _userPaymentService: UserPaymentService;
  private _dataSource: DataSource;

  constructor({
    userPaymentService,
    userRepository,
    dataSource,
  }: {
    userPaymentService: UserPaymentService;
    userRepository: IUserRepository;
    dataSource: DataSource;
  }) {
    this._userPaymentService = userPaymentService;
    this._userRepository = userRepository;
    this._dataSource = dataSource;
  }

  public async createUserAndPayment({ name, nickname }: { name: string; nickname: string }) {
    return transactionContextIntercepter(this._dataSource, async () => {
      const user = await this._userRepository.createUser({ name, nickname });

      await this._userPaymentService.createPaymentLog(user.userId);

      const updatedUser = await this._userRepository.updateUserName({ userId: user.userId, name: 'paymented mun' });

      return updatedUser;
    });
  }

  public async createAndUpdateUser({ name, nickname }: { name: string; nickname: string }) {
    return transactionContextIntercepter(this._dataSource, async () => {
      const user = await this._userRepository.createUser({ name, nickname });

      await this._userRepository.updateUserName({ userId: user.userId, name: 'updated2 mun' });

      return user;
    });
  }

  public async findUser({ userId }: { userId: string }) {
    const user = await this._userRepository.findByUserId(userId);

    return user;
  }
}
