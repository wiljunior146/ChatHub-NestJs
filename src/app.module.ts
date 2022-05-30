import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './app/http/profile/profile.module';
import { AuthModule } from './app/http/authentication/auth.module';
import { UsersModule } from './app/http/users/users.module';
import { User } from './app/models/user.entity';
import { ContactsModule } from './app/http/contacts/contacts.module';
import { MessagesModule } from './app/http/messages/messages.module';
import { Message } from './app/models/message.entity';
import { Contact } from './app/models/contact.entity';
import appConfig from './config/app';
import databaseConfig from './config/database';
import queueConfig from './config/queue';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, queueConfig]
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('queue.host'),
          port: config.get<number>('queue.port'),
          password: config.get<string>('queue.password')
        }
      })
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('app.rateLimiting.ttl'),
        limit: config.get<number>('app.rateLimiting.limit')
      })
    }),
    TypeOrmModule.forRootAsync({
    	imports: [ConfigModule],
      inject: [ConfigService],
		  useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        database: config.get<string>('database.database'),
        url: config.get<string>('database.connection'),
        entities: [
          User,
          Contact,
          Message
        ],
        synchronize: true,
        useNewUrlParser: true,
        logging: true
      })
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
    ProfileModule,
    ContactsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})

export class AppModule {}
