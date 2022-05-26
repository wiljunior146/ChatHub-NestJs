import {
  Controller,
  Request,
  Res,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
 } from '@nestjs/common';
import { MessagesService } from '../../services/messages/messages.service';
import { GetMessageDto } from './dto/get-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { Role } from 'src/app/common/enums/role.enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { ObjectId } from 'mongodb';
import { MessageResource } from './resources/message.resource';
import { InjectUserToQuery } from 'src/app/common/decorators/inject.user.decorator';

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @InjectUserToQuery()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@Query() query: GetMessageDto) {
    const { roomId, ...payload } = query;
    const { data, meta} = await this.messagesService.paginate({
      ...payload,
      roomId: new ObjectId(roomId)
    });

    return {
      data: data.map((message) => new MessageResource(message)),
      meta
    };
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const message = this.messagesService.findOne(id);
    return message;
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    const { roomId, ...data }: any = createMessageDto;
    const payload = {
      roomId: new ObjectId(roomId),
      senderId: req.user._id,
      ...data
    };
    const message = await this.messagesService.create(payload);

    return new MessageResource(message);
  }
}
