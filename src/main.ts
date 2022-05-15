import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());
  app.enableCors({
	  'origin': '*',
	  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	  'preflightContinue': false,
	  'optionsSuccessStatus': 204
	});
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(validationErrors);
    },
  }));

  const port = app.get(ConfigService).get('app.port');
  await app.listen(port);
}

bootstrap();
