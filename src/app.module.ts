import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './models/messages/messages.module';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './models/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { User } from './models/users/entities/user.entity';
import { Message } from './models/messages/entities/message.entity';
import { ProfileModule } from './models/profile/profile.module';
import { ContactsModule } from './models/contacts/contacts.module';
import { Contact } from './models/contacts/entities/contact.entity';

import appConfig from './config/app';
import databaseConfig from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig]
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
