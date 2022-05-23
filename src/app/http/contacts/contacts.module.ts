import { Module } from '@nestjs/common';
import { ContactsService } from '../../services/contacts/contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../models/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact])
  ],
  providers: [ContactsService]
})
export class ContactsModule {}
