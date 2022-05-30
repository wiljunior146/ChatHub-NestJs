import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Body,
  Post,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';
import { SALT_OR_ROUNDS } from 'src/app/common/constants/app.constant';
import { UserResource } from './resources/user.resource';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { Role } from 'src/app/common/enums/role.enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { User } from 'src/app/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRequest } from 'src/app/common/decorators/inject.request.decorator';
import { Request } from 'src/app/common/enums/request.enum';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@Query() query: GetUsersDto): Promise<{ data: UserResource[], meta: object }> {
    const { data, meta } = await this.usersService.paginate(query);
    return {
      data: data.map((user: User) => new UserResource(user)),
      meta
    };
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async store(@Body() body: CreateUserDto) {
    const password = this.config.get<string>('app.password');
    const payload = {
      ...body,
      password: await bcrypt.hash(password, SALT_OR_ROUNDS),
      role: Role.Staff
    }
    const user = await this.usersService.create(payload);
    return new UserResource(user);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string) {
    const user = await this.usersService.findOneOrFail(id);
    return new UserResource(user);
  }

  @Put(':id')
  @InjectRequest(Request.Params, Request.Body, 'id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    return new UserResource(user);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async destroy(@Param('id') id: string) {
    const user = await this.usersService.delete(id);
    return new UserResource(user);
  }
}
