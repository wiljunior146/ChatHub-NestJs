import {
  Controller,
  Request,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { UserResource } from './resources/user.resource';
import { User } from 'src/models/users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import * as bcrypt from 'bcrypt';

@Controller('admin/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(@Request() req): Promise<UserResource[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserResource(user));
  }
}
