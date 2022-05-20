import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  /**
   * Application name.
   *
   * @type {String}
   */
  name: process.env.APP_NAME || 'NestJs',

  /**
   * Application port.
   *
   * @type {Number}
   */
  port: parseInt(process.env.APP_PORT, 10) || 3000,

  /**
   * Application secret key to be used on passport authentication.type
   * 
   * @type {String}
   */
  secretKey: process.env.APP_SECRET_KEY,

  /**
   * Application default password for generating users.
   *
   * @type {String}
   */
  password: process.env.APP_PASSWORD || 'password',

  /**
   * Application rate limiting for requests.
   *
   * @type {Object}
   */
  rateLimiting: {
    /**
     * Time to Live or the number of seconds that each request will last in storage.
     *
     * @type {Number}
     */
  	ttl: parseInt(process.env.APP_RATE_LIMITING_TTL) || 60,

    /**
     * The maximum number of requests within the TTL limit.
     *
     * @type {Number}
     */
  	limit: parseInt(process.env.APP_RATE_LIMITING_LIMIT) || 10,
  },

  /**
   * Sign in options.
   *
   * @type {Object}
   */
  signOptions: {
    /**
     * Expressed in seconds or a string describing a time span.
     *
     * @see  https://github.com/vercel/ms
     * @type {Number|String}
     */
  	expiresIn: process.env.APP_SIGN_OPTIONS_EXPIRES_IN || '30d'
  }
}));
