import { NestFactory } from '@nestjs/core';
import { SeedersModule } from 'src/database/seeders/seeders.module';
import { Seeder } from 'src/database/seeders/seeder';

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