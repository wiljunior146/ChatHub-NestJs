import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { UsersService } from 'src/models/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [ProfileController]
})
export class ProfileModule {}
