export type User = {
  id: string;
  name: string;
  nickName: string;
};
export interface IUserRepository {
  findByUserId(userId: string): Promise<User | null>;
}
