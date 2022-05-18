import { Module } from '@nestjs/common';
import { UsersSeederService } from './users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersSeederService],
  exports: [UsersSeederService]
})
export class UsersSeederModule {}
