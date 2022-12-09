import { IUserRepository, User } from './user-repository.interface';

export class UserRepository implements IUserRepository {
  public async findByUserId(userId: string): Promise<User | null> {
    return {
      id: 'userId',
      name: 'mun hyun',
      nickName: 'ninis',
    };
  }
}
