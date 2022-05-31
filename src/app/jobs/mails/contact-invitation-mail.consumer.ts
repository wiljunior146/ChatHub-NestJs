import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from 'src/app/mails/mails.service';

@Processor('email')
export class EmailConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('contact-invitation')
  async sendContactInvitationMail(job: Job<unknown>) {
    const data: any = job.data;
    const user: any = data.user;
    const inviter: any = data.inviter;
    await this.mailsService.sendContactInvitationMail(user, inviter);
  }
}
