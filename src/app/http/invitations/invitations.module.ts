import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsModule } from 'src/app/mails/mails.module';
import { MailsService } from 'src/app/mails/mails.service';
import { Invitation } from 'src/app/models/invitation.entity';
import { User } from 'src/app/models/user.entity';
import { InvitationsController } from './invitations.controller';
import appConfig from 'src/config/app';
import databaseConfig from 'src/config/database';
import { InvitationsConsumer } from 'src/app/jobs/invitations.consumer';
import { ContactsService } from 'src/app/http/contacts/contacts.service';
import { Contact } from 'src/app/models/contact.entity';
import { InvitationsService } from './invitations.service';
import {
  UserExistsRule
} from 'src/app/common/validations/users/user-exists.validator';
import {
  UserCanCreateInvitationRule
} from 'src/app/common/validations/invitations/user-can-create-invitation.validator';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [
    MailsModule,
    ContactsModule,
    TypeOrmModule.forFeature([Invitation, User, Contact]),
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig]
    }),
    BullModule.registerQueue({
      name: 'invitations'
    })
  ],
  providers: [
    InvitationsService,
    UserExistsRule,
    ContactsService,
    MailsService,
    InvitationsConsumer,
    UserCanCreateInvitationRule
  ],
  controllers: [InvitationsController]
})

export class InvitationsModule {}
