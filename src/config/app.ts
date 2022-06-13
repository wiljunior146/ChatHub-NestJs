import { registerAs } from '@nestjs/config'
import { Environment } from 'src/common/enums/environment.enum';

export default registerAs('app', () => ({
  /**
   * Application name.
   *
   * @type {String}
   */
  name: process.env.APP_NAME || 'NestJs',

  /**
   * Application environment.
   * 
   * @type {Environment}
   */
  env: process.env.APP_ENV || 'production',

  /**
   * Application Url.
   * 
   * @type {String}
   */
  url: process.env.APP_URL || 'http://localhost:3000',

  /**
   * Application port.
   *
   * @type {Number}
   */
  port: parseInt(process.env.APP_PORT, 10) || 3000,

  /**
   * Application default password for generating users.
   *
   * @type {String}
   */
  password: process.env.APP_PASSWORD || 'password'
}));
