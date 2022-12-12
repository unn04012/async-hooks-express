import { DataSource } from 'typeorm';
import { getProviderModule } from '../providers';
import { getTypeOrmModule } from '../schemas';

type QueryExecuter<T> = () => Promise<T>;

// TODO make decorator

export function Transaction() {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const method = desc.value;
    desc.value = async function ({ name, nickname }: { name: string; nickname: string }) {
      const connection = getTypeOrmModule().connection();
      const transactionContextProvider = getProviderModule().transactionContextStorageProvider();
      const queryRunner = connection.createQueryRunner();
      transactionContextProvider.save(queryRunner.manager);
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        console.log(this);
        const result = await this[method({ name, nickname })];

        await queryRunner.commitTransaction();
        return result;
      } catch {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    };
  };
}

export async function transactionContextIntercepter<T>(connection: DataSource, executer: QueryExecuter<T>) {
  const transactionContextProvider = getProviderModule().transactionContextStorageProvider();
  const queryRunner = connection.createQueryRunner();

  // save entityManager at async local storage
  transactionContextProvider.save(queryRunner.manager);

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const result = await executer();

    await queryRunner.commitTransaction();
    return result;
  } catch {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}
