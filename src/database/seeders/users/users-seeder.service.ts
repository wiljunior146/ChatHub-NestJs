import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import { Role } from 'src/app/common/enums/role.enum';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';

import * as bcrypt from 'bcrypt';
import { roleText } from 'src/app/models/getters/user.getter';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    private config: ConfigService
  ) {}

  /**
   * Truncate or remove all data from users collection.
   *
   * @return {void}
   */
  async clear () {
    Logger.warn('Clearing users collection.');

    await this.usersRepository.clear();

    Logger.log('Done clearing users collection.');
  }

  /**
   * Create admin.
   * 
   * @return {void}
   */
  async admin () {
    Logger.warn('Seeding Admin.');

    await this.usersRepository.save({
      first_name: 'wilson',
      last_name: 'jalipa',
      username: 'wilson123',
      email: 'wiljunior146@gmail.com',
      password: await bcrypt.hash(this.config.get<string>('app.password'), SALT_OR_ROUNDS),
      role: Role.Admin
    });

    Logger.log('Done seeding Admin.');
  }

  /**
   * Create number of users base on count parameter.
   * 
   * @param  {Role}  role
   * @param  {number = 1}  count
   * @return {void}
   */
  async users(role: Role, count: number = 1) {
    const specifiedRole: string = roleText({ value: role });
    Logger.warn(`Seeding ${specifiedRole}s.`);

    let users: object[] = [];

    for (let i = 0; i < count; i++) {
      const firstName: string = faker.name.firstName();
      const lastName: string = faker.name.lastName();
      const password: string = await bcrypt.hash(
        this.config.get<string>('app.password'),
        SALT_OR_ROUNDS
      );

      users.push({
        first_name: firstName,
        last_name: lastName,
        username: faker.unique(faker.internet.userName, [firstName, lastName]),
        email: faker.unique(faker.internet.email, [firstName, lastName]),
        password: password,
        role: role,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await this.usersRepository.insertMany(users);

    Logger.log(`Done seeding ${specifiedRole}s.`);
  }
}
