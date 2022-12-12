import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Repository } from 'typeorm';
import { UserSchema } from './user-schema';

export enum AmountType {
  SHAMPOO = 'SHAMPOO',
  AMPLE = 'AMPLE',
}

@Entity('user_payment')
export class UserPaymentSchema {
  @PrimaryColumn({ length: 40 })
  public paymentId: string;

  @Column('int', { width: 11 })
  public amount: number;

  @Column('enum', { enum: AmountType })
  public amountType: AmountType;

  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(() => UserSchema, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  User: UserSchema;
}

export type UserPaymentModel = Repository<UserPaymentSchema>;
