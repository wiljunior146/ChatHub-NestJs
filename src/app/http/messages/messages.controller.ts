import {
  Controller,
  Request,
  Res,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards
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

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() getMessageDto: GetMessageDto) {
    const messages = await this.messagesService.findAll();
    return messages;
  }

  @Get(':id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id) {
    const message = this.messagesService.findOne(id);
    return message;
  }

  @Post()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    const { contactId, ...data }: any = createMessageDto;
    const payload = {
      contactId: new ObjectId(contactId),
      senderId: req.user.id,
      ...data
    };
    const message = await this.messagesService.create(payload);

    return new MessageResource(message);
  }
}
