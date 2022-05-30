import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from '../mails/mails.service';
import { UserInterface } from '../models/interfaces/user.interface';

@Processor('email')
export class EmailConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('welcome-email')
  async sendWelcomeEmail(job: Job<unknown>) {
    const user: any = job.data;
    await this.mailsService.sendWelcomeMail(user);
  }
}
