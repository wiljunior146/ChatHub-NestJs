import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Delete
 } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { GetMessagesRequestDto } from './requests/get-messages-request.dto';
import { CreateMessageRequestDto } from './requests/create-message-request.dto';
import { UpdateMessageRequestDto } from './requests/update-message-request.dto';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { Role } from 'src/app/common/enums/role.enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { MessageResourceDto } from './resources/message-resource.dto';
import { ObjectId } from 'mongodb';
import {
  InjectUserToBody,
  InjectUserToQuery
} from 'src/app/common/decorators/inject.user.decorator';

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @InjectUserToQuery()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@Query() query: GetMessagesRequestDto) {
    const { roomId, ...payload } = query;
    const { data, meta} = await this.messagesService.paginate({
      ...payload,
      roomId: new ObjectId(roomId)
    });

    return {
      data: data.map((message) => new MessageResourceDto(message)),
      meta
    };
  }

  @Post()
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() body: CreateMessageRequestDto,
    @Request() req
  ) {
    const { roomId, ...data }: any = body;
    const payload = {
      roomId: new ObjectId(roomId),
      senderId: req.user._id,
      ...data
    };
    const message = await this.messagesService.create(payload);

    return new MessageResourceDto(message);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateMessageRequestDto,
    @Request() req
  ) {
    const updatedMessage = await this.messagesService.update(req.user, id, body);
    return new MessageResourceDto(updatedMessage);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async destroy(
    @Param('id') id: string,
    @Request() req
  ) {
    const message = await this.messagesService.delete(req.user, id);
    return new MessageResourceDto(message);
  }
}
