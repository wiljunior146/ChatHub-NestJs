import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from 'src/app/mails/mails.service';

@Processor('welcome-mail')
export class EmailConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('send')
  async sendWelcomeMail(job: Job<unknown>) {
    const user: any = job.data;
    await this.mailsService.sendWelcomeMail(user);
  }
}
