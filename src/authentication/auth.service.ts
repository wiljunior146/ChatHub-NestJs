import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/common/enums/role.enum';
import { SALT_OR_ROUNDS } from 'src/common/constants/app.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validate the user.
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: [
        { email: username },
        { username }
      ]
    });

    if (!user) return null

    return await bcrypt.compare(password, user.password)
      ? user
      : null;
  }

  /**
   * Authenticate the user.
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Register or create a new normal user.
   */
  async register(registerDto: RegisterDto) {
    const { password, passwordConfirmation, ...data } = registerDto;
    const user = await this.usersRepository.save({
      ...data,
      role: Role.User,
      password: await bcrypt.hash(password, SALT_OR_ROUNDS),
    });

    return user;
  }
}
