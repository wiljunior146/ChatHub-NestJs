import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExistsRule } from 'src/app/common/validations/users/user-exists.validator';
import { MailsModule } from 'src/app/mails/mails.module';
import { MailsService } from 'src/app/mails/mails.service';
import { Invitation } from 'src/app/models/invitation.entity';
import { User } from 'src/app/models/user.entity';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { UsersService } from 'src/app/services/users/users.service';
import { InvitationsController } from './invitations.controller';
import appConfig from 'src/config/app';
import databaseConfig from 'src/config/database';
import { InvitationConsumer } from 'src/app/jobs/invitation.consumer';
import {
  UserCanCreateInvitationRule
} from 'src/app/common/validations/invitations/user-can-create-invitation.validator';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Contact } from 'src/app/models/contact.entity';

@Module({
  imports: [
    MailsModule,
    TypeOrmModule.forFeature([Invitation, User, Contact]),
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig]
    }),
    BullModule.registerQueue({
      name: 'invitation'
    })
  ],
  providers: [
    InvitationsService,
    UserExistsRule,
    UsersService,
    ContactsService,
    MailsService,
    InvitationConsumer,
    UserCanCreateInvitationRule
  ],
  controllers: [InvitationsController]
})

export class InvitationsModule {}
