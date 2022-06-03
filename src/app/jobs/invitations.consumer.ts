import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from 'src/app/mails/mails.service';

/**
 * Processor for Invitations module.
 * 
 * @note Each module must have different processor but we can have many process.
 */
@Processor('invitations')
export class InvitationsConsumer {
  constructor(
    private mailsService: MailsService
  ) {}

  @Process('send-invitation-mail')
  async sendInvitationMail(job: Job<unknown>) {
    const data: any = job.data;
    const user: any = data.user;
    const inviter: any = data.inviter;
    await this.mailsService.sendInvitationMail(user, inviter);
  }

  @Process('send-declined-invitation-mail')
  async sendDeclinedInvitationMail(job: Job<unknown>) {
    const data: any = job.data;
    const user: any = data.user;
    const inviter: any = data.inviter;
    await this.mailsService.sendDeclinedInvitationMail(user, inviter);
  }

  @Process('send-accepted-invitation-mail')
  async sendAcceptedInvitationMail(job: Job<unknown>) {
    const data: any = job.data;
    const user: any = data.user;
    const inviter: any = data.inviter;
    await this.mailsService.sendAcceptedInvitationMail(user, inviter);
  }

  @Process('send-cancelled-invitation-mail')
  async sendCancelledInvitationMail(job: Job<unknown>) {
    const data: any = job.data;
    const user: any = data.user;
    const inviter: any = data.inviter;
    await this.mailsService.sendCancelledInvitationMail(user, inviter);
  }
}
