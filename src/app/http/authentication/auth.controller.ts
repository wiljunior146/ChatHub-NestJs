import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/app/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/app/common/enums/role.enum';
import { UserResource } from './resources/user.resource';
import { Queue } from 'bull';
import { UsersService } from '../users/users.service';

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
    const { passwordConfirmation, ...data } = registerDto;
    const user = await this.usersService.create({
      ...data,
      role: Role.User
    });

    return new UserResource(user);
  }
}
