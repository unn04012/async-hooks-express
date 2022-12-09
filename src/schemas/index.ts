import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { getConfiguration } from '../configurations';

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

export { initTypeOrmModule };
