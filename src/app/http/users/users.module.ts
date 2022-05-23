import { Module } from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
