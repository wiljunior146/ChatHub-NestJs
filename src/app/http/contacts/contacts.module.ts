import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../entities/contact.entity';
import { ContactsController } from './contacts.controller';
import { User } from 'src/app/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, User])
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
  exports: [ContactsService]
})

export class ContactsModule {}
