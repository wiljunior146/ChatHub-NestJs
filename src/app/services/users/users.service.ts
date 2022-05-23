import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/app/models/user.entity';
import { Paginate } from './interfaces/paginate.interface';
import { Role } from 'src/app/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async paginate(payload: Paginate): Promise<{ data: User[], meta: object }> {
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
    }}
  }

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

  async create(payload: object): Promise<User> {
    return await this.usersRepository.save(payload);
  }

  async update(id: number, payload: object): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    return await this.usersRepository.save({
      ...user,
      ...payload
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
