import { Controller, Get, Post, Body, Patch, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findOne(@Req() request: any) {
    return request.user;
  }

  @Put()
  update(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(updateProfileDto);
  }

  @Patch('password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.profileService.updatePassword(updatePasswordDto);
  }
}
