import { IUserRepository } from '../repositories/user-repository.interface';

export class UserService {
  private _userRepository: IUserRepository;
  constructor({ userRepository }: { userRepository: IUserRepository }) {
    this._userRepository = userRepository;
  }

  public async findUser({ userId }: { userId: string }) {
    const user = await this._userRepository.findByUserId(userId);

    return user;
  }
}
