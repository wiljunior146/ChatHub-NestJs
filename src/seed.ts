import { NestFactory } from '@nestjs/core';
import { SeedersModule } from 'src/database/seeders/seeders.module';
import { Seeder } from 'src/database/seeders/seeder';

/**
 * This will run by running `yarn run seed or yarn seed` on the terminal.
 *
 * @see https://medium.com/the-crowdlinker-chronicle/seeding-databases-using-nestjs-cd6634e8efc5
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedersModule);

  try {
    const seeder = app.get(Seeder);
    await seeder.seed();
  } catch (error) {
    throw error;
  } finally {
    app.close();
  }
}

bootstrap();
