import { DataSource } from 'typeorm';
import { getProviderModule } from '../providers';

type QueryExecuter<T> = () => Promise<T>;

// TODO make decorator
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
