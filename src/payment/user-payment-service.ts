import { nanoid } from 'nanoid';
import { IUserPaymentRepository } from '../repositories/user-payment-repository-interface';
import { AmountType } from '../schemas/user-payment-schema';

export class UserPaymentService {
  private _userPaymentRepository: IUserPaymentRepository;

  constructor({ userPaymentRepository }: { userPaymentRepository: IUserPaymentRepository }) {
    this._userPaymentRepository = userPaymentRepository;
  }

  public async createPaymentLog(userId: string) {
    const paymentLog = await this._requestUserPaymentLog(userId);
    const user = await this._userPaymentRepository.createPayment(paymentLog);

    return user;
  }

  private async _requestUserPaymentLog(userId: string) {
    const paymentId = nanoid();
    return {
      paymentId,
      userId,
      amount: Math.floor(Math.random() * (10000 - 100 + 1) + 100),
      amountType: AmountType[Math.round(Math.random())] as AmountType,
    };
  }
}
