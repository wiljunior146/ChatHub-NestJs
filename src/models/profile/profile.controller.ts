import {
  Controller,
  Request,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { User } from 'src/models/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/common/enums/role.enum';
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
