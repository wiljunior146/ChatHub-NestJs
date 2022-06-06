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
import { UsersService } from './users.service';
import { UserResourceDto } from './resources/user-resource.dto';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { Role } from 'src/app/common/enums/role.enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { GetUsersRequestDto } from './requests/get-users-request.dto';
import { User } from 'src/app/entities/user.entity';
import { CreateUserRequestDto } from './requests/create-user-request.dto';
import { UpdateUserRequestDto } from './requests/update-user-request.dto';
import { InjectRequest } from 'src/app/common/decorators/inject.request.decorator';
import { Request } from 'src/app/common/enums/request.enum';
import { ObjectID } from 'mongodb';
import { InvalidObjectIdException } from 'src/app/exceptions/invalid-object-id.exception';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@Query() query: GetUsersRequestDto) {
    const { data, meta } = await this.usersService.paginate(query);
    return {
      data: data.map((user: User) => new UserResourceDto(user)),
      meta
    };
  }

  @Post('staff')
  @UseInterceptors(ClassSerializerInterceptor)
  async store(@Body() body: CreateUserRequestDto) {
    const user = await this.usersService.create({
      ...body,
      role: Role.Staff
    });
    return new UserResourceDto(user);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string) {
    if (! ObjectID.isValid(id)) throw new InvalidObjectIdException();

    const user = await this.usersService.show(id);
    return new UserResourceDto(user);
  }

  @Put(':id')
  @InjectRequest(Request.Params, Request.Body, 'id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto
  ) {
    if (! ObjectID.isValid(id)) throw new InvalidObjectIdException();

    const user = await this.usersService.update(id, body);
    return new UserResourceDto(user);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async destroy(@Param('id') id: string) {
    if (! ObjectID.isValid(id)) throw new InvalidObjectIdException();

    const user = await this.usersService.delete(id);
    return new UserResourceDto(user);
  }
}
