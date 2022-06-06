import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/app/common/enums/role.enum';
import { User } from 'src/app/entities/user.entity';
import { MongoRepository, ObjectID } from 'typeorm';
import { CreateUserInterface } from './interfaces/create.interface';
import { PaginateUsersInterface } from './interfaces/paginate.interface';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';
import * as bcrypt from 'bcrypt';
import { UpdateUserInterface } from './interfaces/update.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    private readonly config: ConfigService,
    @InjectQueue('users')
    private usersQueue: Queue
  ) {}

  async paginate(
    payload: PaginateUsersInterface
  ): Promise<{ data: User[], meta: object }> {

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

  async create(payload: CreateUserInterface): Promise<User> {
    const password: string = payload.password
      ? payload.password
      : this.config.get<string>('app.password');
    const user = await this.usersRepository.save({
      ...payload,
      password: await bcrypt.hash(password, SALT_OR_ROUNDS)
    });

    await this.usersQueue.add('send-welcome-mail', user);

    return user;
  }

  /**
   * Display the specified resource.
   */
  async show(id: string | ObjectID): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async update(id: string | ObjectID, payload: UpdateUserInterface): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    const password = payload.password
      ? await bcrypt.hash(payload.password, SALT_OR_ROUNDS)
      : user.password;
    return await this.usersRepository.save({ ...user, ...payload, password });
  }

  async delete(id: string | ObjectID): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
