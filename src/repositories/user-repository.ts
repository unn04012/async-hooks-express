import { transactionAlsInstance } from '../async-storages/async-local-storages';
import { UserModel, UserSchema } from '../schemas/user-schema';
import { IUserRepository } from './user-repository.interface';

export class UserRepository implements IUserRepository {
  private _userModel: UserModel;

  constructor({ userModel }: { userModel: UserModel }) {
    this._userModel = userModel;
  }

  public async updateUserName({ userId, name }: { userId: string; name: string }): Promise<UserSchema> {
    const repo = this._getRepo();

    await repo.update({ userId }, { name });

    const user = await repo.findOne({ where: { userId } });

    if (!user) throw new Error('not found user');
    return user;
  }

  public async createUser({ name, nickname }: { name: string; nickname: string }): Promise<UserSchema> {
    const repo = this._getRepo();

    return await repo.save({ name, nickname }, { transaction: false });
  }

  public async findByUserId(userId: string): Promise<UserSchema | null> {
    const repo = this._getRepo();

    return await repo.findOne({ where: { userId } });
  }

  private _getRepo() {
    const entityManager = transactionAlsInstance.getStore();

    return entityManager ? entityManager.getRepository(UserSchema) : this._userModel;
  }
}
