type BeconEnv = 'LOCAL' | 'STAGE' | 'PROD';

type RootConfig = {
  beconEnv: BeconEnv;
  mysql: MysqlConfig;
  http: HttpConfig;
};

type MysqlConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  poolSize: number;
};

type HttpConfig = {
  port: number;
};

export { RootConfig, MysqlConfig, HttpConfig, BeconEnv };
