import { Module } from '@nestjs/common';
import { UsersSeederService } from './users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Contact } from 'src/models/contacts/entities/contact.entity';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import { Message } from 'src/models/messages/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([User, Contact, Message])
  ],
  providers: [UsersSeederService],
  exports: [UsersSeederService]
})
export class UsersSeederModule {}
