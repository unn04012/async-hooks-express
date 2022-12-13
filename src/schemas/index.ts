import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { getConfiguration } from '../configurations';
import { UserPaymentModel, UserPaymentSchema } from './user-payment-schema';
import { UserModel, UserSchema } from './user-schema';

let dataSource: DataSource | null = null;

async function initTypeOrmModule(): Promise<DataSource> {
  const mysqlConfig = getConfiguration().mysql();
  const entities = `${__dirname}/**/*.{js,ts}`;
  const typeOrmDataSource = new DataSource({
    type: 'mysql',
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [entities],
    logging: false,
    synchronize: false,
    timezone: 'Z',
  });

  dataSource = typeOrmDataSource;
  console.log(`[${new Date().toISOString()}] database connection successfully, host:${mysqlConfig.host}`);
  return await typeOrmDataSource.initialize();
}

function getTypeOrmModule() {
  const ds: DataSource | null = dataSource;
  if (!ds) throw new Error('Typeorm module not have been initialized');

  return {
    connection: (): DataSource => ds,
    user: (): UserModel => ds.getRepository(UserSchema),
    userPayment: (): UserPaymentModel => ds.getRepository(UserPaymentSchema),
  };
}

export { initTypeOrmModule, getTypeOrmModule };
