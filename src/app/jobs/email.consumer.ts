import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from '../mails/mails.service';

@Processor('email')
export class EmailConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('welcome')
  async sendWelcomeMail(job: Job<unknown>) {
    const user: any = job.data;
    await this.mailsService.sendWelcomeMail(user);
  }

  @Process('contact-invitation')
  async sendContactInvitationMail(job: Job<unknown>) {
    const data: any = job.data;
    const user: any = data.user;
    const inviter: any = data.inviter;
    await this.mailsService.sendContactInvitationMail(user, inviter);
  }
}
