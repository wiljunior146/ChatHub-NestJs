import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../models/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/models/users/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const { password, ...data } = registerDto;
    const saltOrRounds = 10;
    const payload = {
      ...data,
      role: Role.User,
      password: await bcrypt.hash(password, saltOrRounds)
    };
    const user = await this.usersService.create(payload);
    return new User(user);
  }
}
