import { registerAs } from '@nestjs/config'

export default registerAs('router', () => ({
  /**
   * Time to Live or the number of seconds that each request will last in storage.
   *
   * @type {Number}
   */
  ttl: +process.env.ROUTER_RATE_LIMITING_TTL || 60,

  /**
   * The maximum number of requests within the TTL limit.
   *
   * @type {Number}
   */
  limit: +process.env.ROUTER_RATE_LIMITING_LIMIT || 10,
}));
