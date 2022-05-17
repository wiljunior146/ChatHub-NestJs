import { omit } from 'lodash';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/common/interceptors/inject.user.interceptor';
import { ValidationPipe, ValidationError, BadRequestException, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());
  app.enableCors({
	  'origin': '*',
	  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	  'preflightContinue': false,
	  'optionsSuccessStatus': HttpStatus.NO_CONTENT
	});
  app.setGlobalPrefix('api');
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
