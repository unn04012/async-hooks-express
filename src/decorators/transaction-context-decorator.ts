import { transactionAlsInstance } from '../async-storages/async-local-storages';
import { getTypeOrmModule } from '../schemas';

// TODO make decorator

export function Transaction() {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const method = desc.value;

    desc.value = async function (this: any, ...args: any[]) {
      const connection = getTypeOrmModule().connection();
      const queryRunner = connection.createQueryRunner();

      transactionAlsInstance.enterWith(queryRunner.manager);
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const result = await method.apply(this, args);

        await queryRunner.commitTransaction();
        return result;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    };
  };
}
