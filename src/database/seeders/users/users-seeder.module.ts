import { Module } from '@nestjs/common';
import { UsersSeederService } from './users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import { Contact } from 'src/app/models/contact.entity';
import { ConfigModule } from '@nestjs/config';

import appConfig from 'src/config/app';
import { Message } from 'src/app/models/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    TypeOrmModule.forFeature([User, Contact, Message])
  ],
  providers: [UsersSeederService],
  exports: [UsersSeederService]
})
export class UsersSeederModule {}
