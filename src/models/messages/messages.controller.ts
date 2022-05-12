import {
  Controller,
  HttpStatus,
  Request,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
 } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { GetMessageDto } from './dto/get-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ObjectId } from 'mongodb';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(@Query() getMessageDto: GetMessageDto) {
    const messages = await this.messagesService.findAll();
    return messages
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const message = this.messagesService.findOne(id);
    return message;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req, @Res() res) {
    const { receiver, ...data }: any = CreateMessageDto;
    data.receiver = new ObjectId(createMessageDto.receiver);
    const payload = { ...data, sender: req.user.id };
    const message = await this.messagesService.create(payload);
    return res.json({
      data: message
    });
  }
}
