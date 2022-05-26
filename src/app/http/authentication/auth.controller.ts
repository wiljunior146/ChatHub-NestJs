import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/app/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/app/common/enums/role.enum';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';
import { UserResource } from './resources/user.resource';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';

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
  async register(@Body() registerDto: RegisterDto): Promise<UserResource> {
    const { password, ...data } = registerDto;
    const payload = {
      ...data,
      role: Role.User,
      password: await bcrypt.hash(password, SALT_OR_ROUNDS)
    };
    const user = await this.usersService.create(payload);
    return new UserResource(user);
  }
}
