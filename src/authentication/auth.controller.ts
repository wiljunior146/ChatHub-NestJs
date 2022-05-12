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
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { User } from 'src/models/users/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const payload = {...createUserDto, role: Role.User };
    const user = await this.usersService.create(payload);
    return new User(user);
  }
}
