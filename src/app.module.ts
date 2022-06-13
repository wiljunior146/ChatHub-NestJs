import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { TypeOrmConfigService } from './providers/type-orm-config.service';
import { ThrottlerConfigService } from './providers/throttler-config.service';
import { BullConfigService } from './providers/bull-config.service';
import { UsersModule } from './models/users/users.module';
import { MessagesModule } from './models/messages/messages.module';
import { ContactsModule } from './models/contacts/contacts.module';
import { InvitationsModule } from './models/invitations/invitations.module';
import appConfig from './config/app';
import databaseConfig from './config/database';
import queueConfig from './config/queue';
import routerConfig from './config/router';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        routerConfig,
        databaseConfig,
        queueConfig
      ]
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule.forFeature(queueConfig)],
      useClass: BullConfigService
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(routerConfig)],
      useClass: ThrottlerConfigService
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useClass: TypeOrmConfigService
    }),
    UsersModule,
    MessagesModule,
    ContactsModule,
    InvitationsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})

export class AppModule {}
