import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import {
  UserUniqueWithIgnoreRule
} from 'src/app/common/validations/users/user-unique-with-ignore.validator';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserUniqueWithIgnoreRule, UsersService],
  controllers: [ProfileController]
})

export class ProfileModule {}
