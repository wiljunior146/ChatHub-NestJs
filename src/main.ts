import { omit } from 'lodash';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import * as express from 'express';
import {
  ValidationPipe,
  ValidationError,
  HttpStatus,
  UnprocessableEntityException
} from '@nestjs/common';
import {
  EntityNotFoundExceptionFilter
} from './common/filters/entity-not-found-exception.filter';
import helmet from 'helmet';
import { join } from 'path';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const documentBuilder = new DocumentBuilder()
    .setTitle(config.get<string>('app.name'))
    .setDescription('A simple chatting system.')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Profile')
    .addTag('Contacts')
    .addTag('Invitations')
    .addTag('Messages')
    .addTag('Profile')
    .addTag('Users')
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: config.get<string>('app.name') +  ' API Documentation',
  }

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/docs', app, document, customOptions);

  app.use('/static', express.static(join(__dirname, '..', 'src/static')));
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
    transform: true,
    stopAtFirstError: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const errors = validationErrors.map((value) => omit(value, 'target'));
      return new UnprocessableEntityException(errors);
    },
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port = config.get<number>('app.port');
  await app.listen(port);
}

bootstrap();
