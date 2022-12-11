import { UserSchema } from '../schemas/user-schema';

export interface IUserRepository {
  createUser({ name, nickname }: { name: string; nickname: string }): Promise<UserSchema>;

  updateUserName({ userId, name }: { userId: string; name: string }): Promise<UserSchema>;

  findByUserId(userId: string): Promise<UserSchema | null>;
}
