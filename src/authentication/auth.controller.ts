import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return token;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
