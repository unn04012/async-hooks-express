import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { UserPaymentSchema } from './user-payment-schema';

@Entity('user')
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  public userId: string;

  @Column({ length: 40 })
  public name: string;

  @Column({ length: 40 })
  public nickname: string;

  @CreateDateColumn()
  public createdAt: Date;

  @OneToMany(() => UserPaymentSchema, (userPayment) => userPayment.User)
  UserPayment: UserPaymentSchema[];
}

export type UserModel = Repository<UserSchema>;
