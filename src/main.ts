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

import helmet from 'helmet';
import { AllExceptionFilter } from './app/common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter());

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
