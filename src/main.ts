import { omit } from 'lodash';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
  HttpStatus
} from '@nestjs/common';
import {
  EntityNotFoundExceptionFilter
} from './app/common/filters/entity-not-found-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  app.enableCors({
	  'origin': '*',
	  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	  'preflightContinue': false,
	  'optionsSuccessStatus': HttpStatus.NO_CONTENT
	});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const errors = validationErrors.map((value) => omit(value, 'target'));
      return new BadRequestException(errors);
    },
  }));

  const port = app.get(ConfigService).get('app.port');
  await app.listen(port);
}

bootstrap();
