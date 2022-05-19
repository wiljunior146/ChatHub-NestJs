import {
  Controller,
  Request,
  HttpStatus,
  Get,
  Post,
  Put,
  UseGuards,
  Body,
  Response,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { User } from 'src/models/users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectUserToBody } from 'src/common/decorators/inject.user.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { SALT_OR_ROUNDS } from 'src/common/constants/app.constant';
import * as bcrypt from 'bcrypt';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, TransformInterceptor)
  getProfile(@Request() req): User {
    return new User(req.user);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async updateProfile(
    @Body() updateProfile: UpdateProfileDto,
    @Request() req
  ): Promise<User> {
    const user = await this.usersService.update(req.user.id, updateProfile);
    return new User(user);
  }

  @Put('update/password')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async updatePassword(
    @Body() updateProfile: UpdatePasswordDto,
    @Request() req
  ) {
    const user = await this.usersService.update(req.user.id, {
      password: await bcrypt.hash(updateProfile.password, SALT_OR_ROUNDS)
    });

    return 'success';
  }
}
