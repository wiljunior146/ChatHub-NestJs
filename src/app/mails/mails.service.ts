import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserInterface } from '../models/interfaces/user.interface';

@Injectable()
export class MailsService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService
  ) {}

  async sendWelcomeMail(user: UserInterface) {

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ' + this.config.get<string>('app.name') + '!',
      template: 'welcome-registered-user',
      context: {
        firstName: user.firstName,
        baseUrl: this.config.get<string>('app.url'),
        appName: this.config.get<string>('app.name')
      }
    });
  }
}
