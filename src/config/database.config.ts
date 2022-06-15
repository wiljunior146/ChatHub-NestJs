import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  /**
   * Database host.
   *
   * @type {String}
   */
  host: process.env.DB_HOST,

  /**
   * Database port.
   *
   * @type {Number}
   */
  port: +process.env.DB_PORT,

  /**
   * Database username.
   *
   * @type {String}
   */
  username: process.env.DB_USERNAME,

  /**
   * Database password.
   *
   * @type {String}
   */
  password: process.env.DB_PASSWORD,

  /**
   * Database name.
   * 
   * @type {string}
   */
  database: process.env.DB_DATABASE,

  /**
   * TypeORM database synchronization.
   * 
   * @type {boolean}
   */
  synchronize: process.env.DB_SYNCHRONIZE == 'true'
}));
