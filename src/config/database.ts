import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  /**
   * Mongodb connection string.
   *
   * @example mongodb://localhost/nest
   * @type    {String}
   */
  connection: process.env.DB_CONNECTION,

  /**
   * Database name.
   * 
   * @type {string}
   */
  database: process.env.DB_DATABASE
}));
