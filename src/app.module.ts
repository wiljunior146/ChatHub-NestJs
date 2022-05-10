import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import appConfig from './config/app';
import databaseConfig from './config/database';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MessagesModule,
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
    MongooseModule.forRootAsync({
    	imports: [ConfigModule],
      inject: [ConfigService],
		  useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.connection')
      })
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})

export class AppModule {}
