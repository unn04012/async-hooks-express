import { AmountType, UserPaymentSchema } from '../schemas/user-payment-schema';

export interface IUserPaymentRepository {
  createPayment({
    userId,
    paymentId,
    amount,
    amountType,
  }: {
    userId: string;
    paymentId: string;
    amount: number;
    amountType: AmountType;
  }): Promise<UserPaymentSchema>;
}
