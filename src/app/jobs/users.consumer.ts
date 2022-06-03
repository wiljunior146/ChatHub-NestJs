import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from 'src/app/mails/mails.service';

/**
 * Processor for Users module.
 * 
 * @note Each module must have different processor but we can have many process.
 */
@Processor('users')
export class UsersConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('send-welcome-mail')
  async sendWelcomeMail(job: Job<unknown>) {
    const user: any = job.data;
    await this.mailsService.sendWelcomeMail(user);
  }
}
