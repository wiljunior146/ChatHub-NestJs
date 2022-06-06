import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { Contact } from 'src/app/entities/contact.entity';
import {
  UserCanViewContactRoomRule
} from 'src/app/common/validations/contacts/user-can-view-contact-room.validator';
import { ContactsService } from 'src/app/http/contacts/contacts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Contact])
  ],
  controllers: [MessagesController],
  providers: [MessagesService, ContactsService, UserCanViewContactRoomRule]
})
export class MessagesModule {}
