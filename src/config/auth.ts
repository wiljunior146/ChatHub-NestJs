export default {
  /**
   * Expressed in seconds or a string describing a time span.
   *
   * @see  https://github.com/vercel/ms for expiresIn formats.
   * @type {Number|String}
   */
  expiresIn: process.env.APP_SIGN_OPTIONS_EXPIRES_IN || '30d',

  /**
   * Secret key to be used on passport authentication type.
   * 
   * @type {String}
   */
  secretKey: process.env.APP_SECRET_KEY,
}
