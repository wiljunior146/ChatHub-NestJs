import { Module } from '@nestjs/common';
import { ContactsService } from '../../services/contacts/contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../models/contact.entity';
import { ContactsController } from './contacts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact])
  ],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule {}
