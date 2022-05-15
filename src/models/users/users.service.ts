import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        $or: [
          { email: usernameOrEmail },
          { username: usernameOrEmail }
        ]
      }
    });
  }

  async count (payload: object): Promise<number> {
    return await this.usersRepository.count(payload);
  }

  async create(payload: CreateUserDto): Promise<User> {
    const { password, ...data }: any = payload;
    const saltOrRounds = 10;

    data.password = await bcrypt.hash(password, saltOrRounds);

    return await this.usersRepository.save(data);
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
