import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SameRule } from 'src/common/validations/common/same.validator';
import { UserPasswordRule } from 'src/common/validations/users/user-password.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, SameRule, UserPasswordRule],
})
export class ProfileModule {}
