import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

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
}

export type UserModel = Repository<UserSchema>;
