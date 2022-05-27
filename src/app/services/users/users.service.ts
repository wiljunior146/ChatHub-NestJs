import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/app/models/user.entity';
import { PaginateUsersInterface } from './interfaces/paginate.interface';
import { Role } from 'src/app/common/enums/role.enum';
import { CreateUserInterface } from './interfaces/create.interface';
import { UpdateUserInterface } from './interfaces/update.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async paginate(payload: PaginateUsersInterface): Promise<{ data: User[], meta: object }> {
    const take: number = payload.limit;
    const skip: number = (payload.page - 1) * take;

    const [data, total] = await this.usersRepository.findAndCount({
      where: {
        role: payload.role ? payload.role : { $ne: Role.Admin },
      },
      skip,
      take
    });

    return { data, meta: {
      total: total,
      page: payload.page,
      limit: payload.limit
    }};
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findOneOrFail(id: string): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
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

  async count(payload: object): Promise<number> {
    return await this.usersRepository.count(payload);
  }

  async create(payload: CreateUserInterface): Promise<User> {
    return await this.usersRepository.save(payload);
  }

  async update(id: string, payload: UpdateUserInterface): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    return await this.usersRepository.save({
      ...user,
      ...payload
    });
  }

  async delete(id: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
