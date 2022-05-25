import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import { Contact } from 'src/app/models/contact.entity';
import { Role } from 'src/app/common/enums/role.enum';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';

import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/app/models/interfaces/user.interface';
import { ContactInterface } from 'src/app/models/interfaces/contact.interface';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    @InjectRepository(Contact)
    private contactsRepository: MongoRepository<Contact>,
    private config: ConfigService
  ) {}

  /**
   * Truncate or remove all data from users and contacts collection.
   *
   * @return {void}
   */
  async clear () {
    Logger.warn('Clearing users and contacts collection.');

    await this.contactsRepository.clear();
    await this.usersRepository.clear();

    Logger.log('Done clearing users and contacts collection.');
  }

  /**
   * Create admin.
   * 
   * @return {void}
   */
  async admin () {
    Logger.warn('Seeding Admin.');

    await this.usersRepository.save(<UserInterface>{
      firstName: 'wilson',
      lastName: 'jalipa',
      username: 'wilson123',
      email: 'wiljunior146@gmail.com',
      password: await bcrypt.hash(this.config.get<string>('app.password'), SALT_OR_ROUNDS),
      role: Role.Admin
    });

    Logger.log('Done seeding Admin.');
  }

  /**
   * Create user with contacts.
   * 
   * @note   This will also create another users base on how
   *         many contacts that needs to create.
   * @param  {number = 1}  totalContacts
   * @return {void}
   */
  async userWithContacts(totalContacts: number = 1) {
    Logger.warn(`Seeding users with contacts.`);

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

      let contacts: ContactInterface[] = [
        {
          userId: user._id,
          contactableId: contactable._id,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: contactable._id,
          contactableId: user._id,
          createdAt: new Date,
          updatedAt: new Date
        }
      ];
      
      await this.contactsRepository.insertMany(contacts);
    }

    Logger.log(`Done seeding users with contacts.`);
  }
}
