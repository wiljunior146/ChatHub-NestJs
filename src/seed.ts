import { NestFactory } from '@nestjs/core';
import { SeedersModule } from 'src/database/seeders/seeders.module';
import { Seeder } from 'src/database/seeders/seeder';

/**
 * This will call the main seeder by running `yarn run seed or yarn seed`.
 *
 * @see package.json script with "ts-node -r tsconfig-paths/register <path>/seed.ts".
 * @see https://medium.com/the-crowdlinker-chronicle/seeding-databases-using-nestjs-cd6634e8efc5 
 */
async function bootstrap() {
  NestFactory.createApplicationContext(SeedersModule)
    .then(async (appContext) => {
      const seeder = appContext.get(Seeder);

      await seeder.seed();

      appContext.close();
    })
    .catch(error => {
      throw error;
    });
}

bootstrap();
