import { Module } from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { UserUniqueExceptPassedUserRule } from 'src/app/common/validations/users/user-unique-except-passed-user.validator';

import appConfig from 'src/config/app';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [appConfig]
    })
  ],
  providers: [UsersService, UserUniqueExceptPassedUserRule],
  exports: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
