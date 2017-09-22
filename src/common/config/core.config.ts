
export class CoreConfig {
  static HOST: string = 'http://127.0.0.1';
  static PORT: number = 3001;
  static BASE_URL: string = `${ CoreConfig.HOST }:${ CoreConfig.PORT }`;
  static APP_NAME: string = 'todo-manager';
  static API_VERSION: number = 1;
  static BASE_API: string = `/api/v${ CoreConfig.API_VERSION }`;
  static MONGO_PORT: number = 27017;
  static MONGO_URL: string = `mongodb://localhost:${ CoreConfig.MONGO_PORT }/${ CoreConfig.APP_NAME }`;
}
