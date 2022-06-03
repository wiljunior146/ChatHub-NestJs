import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  UserUniqueWithIgnoreRule
} from 'src/app/common/validations/users/user-unique-with-ignore.validator';
import appConfig from 'src/config/app';
import { BullModule } from '@nestjs/bull';
import { MailsService } from 'src/app/mails/mails.service';
import { MailsModule } from 'src/app/mails/mails.module';
import { UsersConsumer } from 'src/app/jobs/users.consumer';

@Module({
  imports: [
    MailsModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    BullModule.registerQueue({
      name: 'users'
    })
  ],
  providers: [
    UsersService,
    MailsService,
    UsersConsumer,
    UserUniqueWithIgnoreRule
  ],
  controllers: [UsersController],
  exports: [
    UsersService,
    ConfigModule,
    BullModule,
    UsersConsumer,
    MailsService
  ]
})

export class UsersModule { }
