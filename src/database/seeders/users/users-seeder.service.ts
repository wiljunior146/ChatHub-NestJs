import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import { Contact } from 'src/app/entities/contact.entity';
import { Role } from 'src/app/common/enums/role.enum';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/app/entities/interfaces/user.interface';
import { ContactInterface } from 'src/app/entities/interfaces/contact.interface';
import { ObjectID } from 'mongodb';
import { Message } from 'src/app/entities/message.entity';
import { MessageInterface } from 'src/app/entities/interfaces/message.interface';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    @InjectRepository(Contact)
    private contactsRepository: MongoRepository<Contact>,
    @InjectRepository(Message)
    private messagesRepository: MongoRepository<Message>,
    private config: ConfigService
  ) {}

  /**
   * Create admin.
   * 
   * @return {void}
   */
  async admin () {
    Logger.warn('Seeding admin.');

    await this.usersRepository.save(<UserInterface>{
      firstName: 'wilson',
      lastName: 'jalipa',
      username: 'wilson123',
      email: 'wiljunior146@gmail.com',
      password: await bcrypt.hash(this.config.get<string>('app.password'), SALT_OR_ROUNDS),
      role: Role.Admin
    });

    Logger.log('Done seeding admin.');
  }

  /**
   * Create staffs.
   * 
   * @param  {number = 1}  totalContacts
   * @return {void}
   */
  async staffs(totalStaffs: number = 1) {
    Logger.warn('Seeding staffs.');

    const password: string = await bcrypt.hash(
      this.config.get<string>('app.password'),
      SALT_OR_ROUNDS
    );
    let staffs: UserInterface[] = [];

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

    await this.usersRepository.insertMany(staffs);

    Logger.log('Done seeding staffs.');
  }

  /**
   * Create users with contacts and messages.
   * 
   * @note   This will also create another users base on how
   *         many contacts that needs to create.
   * @param  {number = 1}  totalContacts
   * @return {void}
   */
  async users(totalContacts: number = 1) {
    Logger.warn(`Seeding users with contacts and messages.`);

    const password: string = await bcrypt.hash(
      this.config.get<string>('app.password'),
      SALT_OR_ROUNDS
    );

    const user = await this.usersRepository.save(<UserInterface> {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.unique(faker.internet.userName),
      email: faker.unique(faker.internet.email),
      password: password,
      role: Role.User
    });

    for (let i = 0; i < totalContacts; i++) {
      const contactable = await this.usersRepository.save(<UserInterface> {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.unique(faker.internet.userName),
        email: faker.unique(faker.internet.email),
        password: password,
        role: Role.User
      });

      const roomId = new ObjectID();
      let contacts: ContactInterface[] = [
        {
          userId: user._id,
          contactableId: contactable._id,
          roomId,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: contactable._id,
          contactableId: user._id,
          roomId,
          createdAt: new Date,
          updatedAt: new Date
        }
      ];
      
      await this.contactsRepository.insertMany(contacts);

      let messages: MessageInterface[] =  [];

      for (let i = 0; i < 5; i++) {
        messages.push({
          content: faker.lorem.text(),
          userId: i % 2 == 0 ? user._id : contactable._id,
          roomId,
          createdAt: new Date,
          updatedAt: new Date
        });
      }

      this.messagesRepository.insertMany(messages);
    }

    Logger.log(`Done seeding users with contacts and messages.`);
  }
}
