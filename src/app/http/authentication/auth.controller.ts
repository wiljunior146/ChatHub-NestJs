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
import { RegisterRequestDto } from './requests/register-request.dto';
import { Role } from 'src/app/common/enums/role.enum';
import { UserResourceDto } from './resources/user-resource.dto';
import { UsersService } from '../users/users.service';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { LoginRequestDto } from './requests/login-request.dto';
import { TokenResourceDto } from './resources/token-resouce.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  @ApiBody({ type: LoginRequestDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return new TokenResourceDto(token);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterRequestDto): Promise<UserResourceDto> {
    const { passwordConfirmation, ...data } = registerDto;
    const user = await this.usersService.create({
      ...data,
      role: Role.User
    });

    return new UserResourceDto(user);
  }
}
