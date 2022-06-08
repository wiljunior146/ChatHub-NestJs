import {
  Controller,
  Request,
  Get,
  Put,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { UpdateProfileRequestDto } from './requests/update-profile-request.dto';
import { UpdatePasswordRequestDto } from './requests/update-password-request.dto';
import { InjectUserToBody } from 'src/app/common/decorators/inject.user.decorator';
import { ProfileResourceDto } from './resources/profile-resource.dto';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  index(@Request() req) {
    return new ProfileResourceDto(req.user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Body() body: UpdateProfileRequestDto,
    @Request() req
  ) {
    const user = await this.usersService.update(req.user._id, body);
    return new ProfileResourceDto(user);
  }

  @Put('password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Body() body: UpdatePasswordRequestDto,
    @Request() req
  ) {
    await this.usersService.update(req.user._id, body);

    return 'success';
  }
}
