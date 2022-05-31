import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExistsRule } from 'src/app/common/validations/users/user-exists.validator';
import { EmailConsumer } from 'src/app/jobs/email.consumer';
import { MailsModule } from 'src/app/mails/mails.module';
import { MailsService } from 'src/app/mails/mails.service';
import { Invitation } from 'src/app/models/invitation.entity';
import { User } from 'src/app/models/user.entity';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { UsersService } from 'src/app/services/users/users.service';
import { InvitationsController } from './invitations.controller';
import appConfig from 'src/config/app';
import databaseConfig from 'src/config/database';

@Module({
  imports: [
    MailsModule,
    TypeOrmModule.forFeature([Invitation, User]),
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig]
    }),
    BullModule.registerQueue({
      name: 'email'
    })
  ],
  providers: [
    InvitationsService,
    UserExistsRule,
    UsersService,
    MailsService,
    EmailConsumer
  ],
  controllers: [InvitationsController]
})
export class InvitationsModule {}
