import { Injectable } from '@nestjs/common';
import { Role } from 'src/app/common/enums/role.enum';
import { UsersSeederService } from './users/users-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeederService: UsersSeederService,
  ) {}

  /**
   * Seed or insert data to collections.
   *
   * @return {void}
   */
  async seed() {
    await this.usersSeederService.admin();
    await this.usersSeederService.users(Role.Staff, 50);
    await this.usersSeederService.users(Role.User, 50);
  }

  /**
   * Truncate or remove all data from collections.
   *
   * @return {void}
   */
  async clear() {
    await this.usersSeederService.clear();
  }
}
