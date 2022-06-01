import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from 'src/app/mails/mails.service';

/**
 * Processor for Auth module.
 * 
 * @note Each module must have different processor but we can have many process.
 */
@Processor('auth')
export class AuthConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('send-welcome-mail')
  async sendWelcomeMail(job: Job<unknown>) {
    const user: any = job.data;
    await this.mailsService.sendWelcomeMail(user);
  }
}
