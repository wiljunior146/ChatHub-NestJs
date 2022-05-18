import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'NestJs',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  secretKey: process.env.APP_SECRET_KEY,
  rateLimiting: {
  	ttl: parseInt(process.env.APP_RATE_LIMITING_TTL) || 60,
  	limit: parseInt(process.env.APP_RATE_LIMITING_LIMIT) || 10,
  },
  signOptions: {
  	expiresIn: process.env.APP_SIGN_OPTIONS_EXPIRES_IN || '30d'
  }
}));
