import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query
} from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';
import { UserResource } from './resources/user.resource';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { Role } from 'src/app/common/enums/role.enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { User } from 'src/app/models/user.entity';

@Controller('admin/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(@Query() query: GetUsersDto): Promise<{ data: UserResource[], meta: object }> {
    const { data, meta } = await this.usersService.paginate(query);
    return {
      data: data.map((user: User) => new UserResource(user)),
      meta
    };
  }
}
