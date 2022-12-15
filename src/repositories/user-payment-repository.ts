import { transactionAlsInstance } from '../middlewares/request-context-storage-middleware';
import { AmountType, UserPaymentModel, UserPaymentSchema } from '../schemas/user-payment-schema';
import { UserModel } from '../schemas/user-schema';
import { IUserPaymentRepository } from './user-payment-repository-interface';

export class UserPaymentRepository implements IUserPaymentRepository {
  private _userModel: UserModel;
  private _userPaymentModel: UserPaymentModel;

  constructor({ userModel, userPaymentModel }: { userModel: UserModel; userPaymentModel: UserPaymentModel }) {
    this._userModel = userModel;
    this._userPaymentModel = userPaymentModel;
  }

  public async createPayment({
    userId,
    paymentId,
    amount,
    amountType,
  }: {
    userId: string;
    paymentId: string;
    amount: number;
    amountType: AmountType;
  }): Promise<UserPaymentSchema> {
    const repo = this._getRepo();
    const user = this._userModel.create({ userId });
    return await repo.save({ paymentId, amount, amountType, User: user });
  }

  private _getRepo() {
    const entityManager = transactionAlsInstance.getStore();

    return entityManager ? entityManager.getRepository(UserPaymentSchema) : this._userPaymentModel;
  }
}
