import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserUniqueRule } from 'src/common/validations/users/user-unique.validator';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import {
  UserUniqueWithIgnoreRule
} from 'src/common/validations/users/user-unique-with-ignore.validator';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserUniqueRule,
    UserUniqueWithIgnoreRule
  ],
  exports: [UsersService],
})
export class UsersModule {}
