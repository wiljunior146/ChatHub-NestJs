import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../entities/contact.entity';
import { ContactsController } from './contacts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact])
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
  exports: [ContactsService]
})

export class ContactsModule {}
