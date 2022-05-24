import { Module } from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import {
  UserUniqueWithIgnoreRule
} from 'src/app/common/validations/users/user-unique-with-ignore.validator';

import appConfig from 'src/config/app';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [appConfig]
    })
  ],
  providers: [UsersService, UserUniqueWithIgnoreRule],
  exports: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
