import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  connection: process.env.DB_CONNECTION
}));
