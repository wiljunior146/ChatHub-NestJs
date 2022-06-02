import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
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
  providers: [
    UsersService,
    UserUniqueWithIgnoreRule
  ],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule { }
