import {
  Controller,
  Request,
  Get,
  UseGuards
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { User } from 'src/models/users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(@Request() req): Promise<User[]> {
    return this.usersService.findAll();
  }
}
