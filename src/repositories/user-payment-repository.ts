import { TransactionContextStorageProvider } from '../providers/transaction-context-storage-provider';
import { AmountType, UserPaymentModel, UserPaymentSchema } from '../schemas/user-payment-schema';
import { UserModel } from '../schemas/user-schema';
import { IUserPaymentRepository } from './user-payment-repository-interface';

export class UserPaymentRepository implements IUserPaymentRepository {
  private _userModel: UserModel;
  private _userPaymentModel: UserPaymentModel;
  private _transactionContextStorageProvider: TransactionContextStorageProvider;

  constructor({
    userModel,
    userPaymentModel,
    transactionContextStorageProvider,
  }: {
    userModel: UserModel;
    userPaymentModel: UserPaymentModel;
    transactionContextStorageProvider: TransactionContextStorageProvider;
  }) {
    this._userModel = userModel;
    this._userPaymentModel = userPaymentModel;
    this._transactionContextStorageProvider = transactionContextStorageProvider;
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
    const entityManager = this._transactionContextStorageProvider.get();

    return entityManager ? entityManager.getRepository(UserPaymentSchema) : this._userPaymentModel;
  }
}
