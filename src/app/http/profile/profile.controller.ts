import {
  Controller,
  Request,
  HttpStatus,
  Get,
  Post,
  Put,
  UseGuards,
  Body,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectUserToBody } from 'src/app/common/decorators/inject.user.decorator';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';
import { UserResource } from './resources/user.resource';
import * as bcrypt from 'bcrypt';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req): UserResource {
    return new UserResource(req.user);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async updateProfile(
    @Body() updateProfile: UpdateProfileDto,
    @Request() req
  ): Promise<UserResource> {
    const user = await this.usersService.update(req.user.id, updateProfile);
    return new UserResource(user);
  }

  @Put('update/password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Body() updateProfile: UpdatePasswordDto,
    @Request() req
  ) {
    await this.usersService.update(req.user.id, {
      password: await bcrypt.hash(updateProfile.password, SALT_OR_ROUNDS)
    });

    return 'success';
  }
}
