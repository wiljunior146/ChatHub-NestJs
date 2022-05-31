import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user.entity';

@Injectable()
export class MailsService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService
  ) {}

  async sendWelcomeMail(user: User) {

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ' + this.config.get<string>('app.name') + '!',
      template: 'welcome-registered-user',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        baseUrl: this.config.get<string>('app.url'),
        appName: this.config.get<string>('app.name')
      }
    });
  }

  async sendContactInvitationMail(user: User, inviter: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `${inviter.firstName} ${inviter.lastName} sent you an invitation to be a contact.`,
      template: 'contact-invitation',
      context: {
        user,
        inviter,
        appName: this.config.get<string>('app.name')
      }
    });
  }
}
