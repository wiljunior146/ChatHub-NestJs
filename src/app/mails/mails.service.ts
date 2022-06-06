import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';

/**
 * We are using handlebars for templating our emails.
 * 
 * @todo  For now it's only a basic emails but let's create another service soon.
 * @note  The expressions on handlebars are different from javascript.
 * @see   https://handlebarsjs.com/guide/expressions.html#literal-segments
 */
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

  async sendInvitationMail(user: User, inviter: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `${inviter.firstName} ${inviter.lastName} sent you an invitation to be a contact.`,
      template: 'created-invitation',
      context: {
        user,
        inviter,
        baseUrl: this.config.get<string>('app.url'),
        appName: this.config.get<string>('app.name')
      }
    });
  }

  async sendCancelledInvitationMail(user: User, inviter: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `${inviter.firstName} ${inviter.lastName} cancelled the invitation for you to be a contact.`,
      template: 'cancelled-invitation',
      context: {
        user,
        inviter,
        baseUrl: this.config.get<string>('app.url'),
        appName: this.config.get<string>('app.name')
      }
    });
  }

  async sendDeclinedInvitationMail(user: User, inviter: User) {
    await this.mailerService.sendMail({
      to: inviter.email,
      subject: `${user.firstName} ${user.lastName} declined the invitation to be your contact.`,
      template: 'declined-invitation',
      context: {
        user,
        inviter,
        baseUrl: this.config.get<string>('app.url'),
        appName: this.config.get<string>('app.name')
      }
    });
  }

  async sendAcceptedInvitationMail(user: User, inviter: User) {
    await this.mailerService.sendMail({
      to: inviter.email,
      subject: `${user.firstName} ${user.lastName} accepted the invitation to be your contact.`,
      template: 'accepted-invitation',
      context: {
        user,
        inviter,
        baseUrl: this.config.get<string>('app.url'),
        appName: this.config.get<string>('app.name')
      }
    });
  }
}
