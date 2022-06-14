import { registerAs } from '@nestjs/config'

export default registerAs('mail', () => ({
  /**
   * Mail host.
   *
   * @type {String}
   */
  host: process.env.MAIL_HOST,

  /**
   * Mail port.
   * 
   * @type {Number}
   */
  port: process.env.MAIL_PORT,

  /**
   * Mail auth username.
   * 
   * @type {String}
   */
  username: process.env.MAIL_USERNAME,

  /**
   * Mail auth password.
   * 
   * @type {String}
   */
  password: process.env.MAIL_PASSWORD,

  /**
   * Mail "From".
   * 
   * @type {Object}
   */
  from: {
    /**
     * Mail "From" address.
     * 
     * @example admin@example.com
     * @type {String}
     */
    address: process.env.MAIL_FROM_ADDRESS,

    /**
     * Mail "From" name.
     * 
     * @type {String}
     */
    name: process.env.MAIL_FROM_NAME
  }
}));
