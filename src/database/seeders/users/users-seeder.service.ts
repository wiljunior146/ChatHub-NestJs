import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async handle () {
    const saltOrRounds = 10;
    const password = await bcrypt.hash('password', saltOrRounds);
    await this.usersRepository.save({
      first_name: 'wilson',
      last_name: 'jalipa',
      username: 'wilson123',
      email: 'wiljunior146@gmail.com',
      password: password,
      role: Role.Admin
    });
  }
}
