import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Contact } from 'src/models/contacts/entities/contact.entity';
import { Message } from 'src/models/messages/entities/message.entity';
import { Role } from 'src/common/enums/role.enum';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { SALT_OR_ROUNDS } from 'src/common/constants/app.constant';
import * as bcrypt from 'bcrypt';
import appConfig from 'src/config/app.config';
import { ConfigType } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  /**
   * Create admin.
   */
  async admin () {
    Logger.warn('Seeding admin.');

    await this.usersRepository.save(<any>{
      firstName: 'wilson',
      lastName: 'jalipa',
      username: 'wilson123',
      email: 'wiljunior146@gmail.com',
      password: await bcrypt.hash(this.appConfiguration.password, SALT_OR_ROUNDS),
      role: Role.Admin
    });

    Logger.log('Done seeding admin.');
  }

  /**
   * Create staffs.
   * 
   * @param  number  totalContacts
   */
  async staffs(totalStaffs: number = 1) {
    Logger.warn('Seeding staffs.');

    const password: string = await bcrypt.hash(
      this.appConfiguration.password,
      SALT_OR_ROUNDS
    );
    let staffs: any[] = [];

    for (let i = 0; i < totalStaffs; i++) {
      staffs.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.unique(faker.internet.userName),
        email: faker.unique(faker.internet.email),
        password: password,
        role: Role.Staff
      });
    }

    await this.usersRepository.insert(staffs);

    Logger.log('Done seeding staffs.');
  }

  /**
   * Create users with contacts and messages.
   * 
   * @note   This will also create another users base on how
   *         many contacts that needs to create.
   * @param  number  totalContacts
   */
  async users(totalContacts: number = 1) {
    Logger.warn(`Seeding users with contacts and messages.`);

    const password: string = await bcrypt.hash(
      this.appConfiguration.password,
      SALT_OR_ROUNDS
    );

    const user: any = await this.usersRepository.save(<any> {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.unique(faker.internet.userName),
      email: faker.unique(faker.internet.email),
      password: password,
      role: Role.User
    });

    for (let i = 0; i < totalContacts; i++) {
      const contactable: any = await this.usersRepository.save(<any> {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.unique(faker.internet.userName),
        email: faker.unique(faker.internet.email),
        password: password,
        role: Role.User
      });

      const roomId = uuidv4();
      let contacts: any[] = [
        {
          userId: user.id,
          contactableId: contactable.id,
          roomId,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: contactable.id,
          contactableId: user.id,
          roomId,
          createdAt: new Date,
          updatedAt: new Date
        }
      ];
      
      await this.contactsRepository.insert(contacts);

      let messages: any[] =  [];

      for (let i = 0; i < 5; i++) {
        messages.push({
          content: faker.lorem.text(),
          userId: i % 2 == 0 ? user.id : contactable.id,
          roomId,
          createdAt: new Date,
          updatedAt: new Date
        });
      }

      this.messagesRepository.insert(messages);
    }

    Logger.log(`Done seeding users with contacts and messages.`);
  }
}
