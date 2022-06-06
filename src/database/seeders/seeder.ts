import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Environment } from 'src/app/common/enums/environment.enum';
import { Contact } from 'src/app/entities/contact.entity';
import { Invitation } from 'src/app/entities/invitation.entity';
import { Message } from 'src/app/entities/message.entity';
import { User } from 'src/app/entities/user.entity';
import { MongoRepository } from 'typeorm';
import { UsersSeederService } from './users/users-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    @InjectRepository(Contact)
    private contactsRepository: MongoRepository<Contact>,
    @InjectRepository(Message)
    private messagesRepository: MongoRepository<Message>,
    @InjectRepository(Invitation)
    private invitationsRepository: MongoRepository<Invitation>,
    private readonly usersSeederService: UsersSeederService,
    private config: ConfigService
  ) {}

  /**
   * Seed or insert data to collections.
   *
   * @return void
   */
  async seed() {
    const environment = this.config.get<string>('app.env');

    await this.usersSeederService.admin();

    if (environment == Environment.Local) {
      await this.usersSeederService.users(5);
      await this.usersSeederService.staffs(2);
    }
  }

  /**
   * Truncate or drop all collections.
   *
   * @return void
   */
  async clear() {
    Logger.warn('Dropping Collections.');

    await this.contactsRepository
      .clear()
      .then(() => Logger.log('The contacts collection is dropped.'))
      .catch(() => Logger.error('The contacts collection doesn\'t exists.'));
    await this.invitationsRepository
      .clear()
      .then(() => Logger.log('The invitations collection is dropped.'))
      .catch(() => Logger.error('The invitations collection doesn\'t exists.'));
    await this.usersRepository
      .clear()
      .then(() => Logger.log('The users collection is dropped.'))
      .catch(() => Logger.error('The users collection doesn\'t exists.'));
    await this.messagesRepository
      .clear()
      .then(() => Logger.log('The messages collection is dropped.'))
      .catch(() => Logger.error('The messages collection doesn\'t exists.'));

    Logger.log('Done dropping collections.');
  }
}
