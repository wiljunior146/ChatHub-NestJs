import { Controller, Get, Post, Body, Patch, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { InjectUserIdToBody } from 'src/common/decorators/inject-user-id.decorator';
import { InjectUserToBody } from 'src/common/decorators/inject-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findOne(@Req() request: any) {
    return request.user;
  }

  @Put()
  @InjectUserIdToBody()
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() request: any
  ) {
    return this.profileService.update(request.user.id, updateProfileDto);
  }

  @Patch('password')
  @InjectUserToBody()
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() request: any
  ) {
    return this.profileService.updatePassword(request.user.id, updatePasswordDto);
  }
}
