import { registerAs } from '@nestjs/config'

export default registerAs('queue', () => ({
  /**
   * Redis host.
   *
   * @type {String}
   */
  host: process.env.REDIS_HOST,

  /**
   * Redis port.
   * 
   * @type {Number}
   */
  port: parseInt(process.env.REDIS_PORT),

  /**
   * Redis password.
   * 
   * @note Leave it empty if there is no password.
   * @type { String }
   */
  password: process.env.REDIS_PASSWORD
}));
