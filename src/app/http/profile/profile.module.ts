import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import { UsersService } from 'src/app/services/users/users.service';
import {
  UserUniqueWithIgnoreRule
} from 'src/app/common/validations/users/user-unique-with-ignore.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService, UserUniqueWithIgnoreRule],
  controllers: [ProfileController]
})
export class ProfileModule {}
