import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users/entities/user.entity';
import { UsersSeederService } from './users/users-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeederService: UsersSeederService,
  ) {}

  async seed() {
    await this.usersSeederService.admin();
    await this.usersSeederService.users(30);
  }
}
