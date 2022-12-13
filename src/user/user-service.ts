import { DataSource } from 'typeorm';
import { Transaction, transactionContextIntercepter } from '../decorators/transaction-context-decorator';
import { UserPaymentService } from '../payment/user-payment-service';
import { IUserRepository } from '../repositories/user-repository.interface';

export class UserService {
  private _userRepository: IUserRepository;
  private _userPaymentService: UserPaymentService;

  constructor({ userPaymentService, userRepository }: { userPaymentService: UserPaymentService; userRepository: IUserRepository }) {
    this._userPaymentService = userPaymentService;
    this._userRepository = userRepository;
  }

  @Transaction()
  public async createUserAndPayment({ name, nickname }: { name: string; nickname: string }) {
    const user = await this._userRepository.createUser({ name, nickname });

    await this._userPaymentService.createPaymentLog(user.userId);

    const updatedUser = await this._userRepository.updateUserName({ userId: user.userId, name: 'paymented mun' });

    return updatedUser;
  }

  @Transaction()
  public async createAndUpdateUser({ name, nickname }: { name: string; nickname: string }) {
    const user = await this._userRepository.createUser({ name, nickname });

    await this._userRepository.updateUserName({ userId: user.userId, name: 'decorator mun' });

    return user;
  }

  public async findUser({ userId }: { userId: string }) {
    const user = await this._userRepository.findByUserId(userId);

    return user;
  }
}
