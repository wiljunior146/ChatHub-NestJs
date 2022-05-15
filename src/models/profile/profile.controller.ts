import {
  Controller,
  Request,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { User } from 'src/models/users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly messagesService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req): User {
    return new User(req.user);
  }
}
