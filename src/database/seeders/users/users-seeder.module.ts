import { Module } from '@nestjs/common';
import { UsersSeederService } from './users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import { ConfigModule } from '@nestjs/config';

import appConfig from 'src/config/app';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersSeederService],
  exports: [UsersSeederService]
})
export class UsersSeederModule {}
