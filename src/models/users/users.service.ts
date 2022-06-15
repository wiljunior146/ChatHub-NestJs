import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enums/role.enum';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants/app.constant';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(appConfig.KEY)
    private appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  /**
   * Create a new user with staff role.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = this.appConfiguration.password;
    return await this.usersRepository.save({
      ...createUserDto,
      role: Role.Staff,
      password: await bcrypt.hash(password, SALT_OR_ROUNDS),
    });
  }

  /**
   * Get users with pagination except the user with role admin .
   */
  async findAll(getUsersDto: GetUsersDto) {
    const { page, limit, role } = getUsersDto;
    return await this.usersRepository.find({
      where: {
        role: role ? role : Not(Role.Admin),
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  /**
   * Get user with the specified id.
   */
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  /**
   * Update user with the specified id.
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail(id);
    if (user.role === Role.Admin) {
      throw new ForbiddenException('The selected user is an admin.');
    }
    return await this.usersRepository.save({id, ...updateUserDto});
  }

  /**
   * Remove user with the specified id.
   */
  async remove(id: number) {
    const user = await this.usersRepository.findOneOrFail(id);
    if (user.role === Role.Admin) {
      throw new ForbiddenException('The selected user is an admin.');
    }
    await this.usersRepository.remove(user);
    return user;
  }
}
