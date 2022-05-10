import {
  Controller,
  HttpStatus,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
 } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { GetMessageDto } from './dto/get-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiResponse({ status: 201 })
  async findAll(@Query() getMessageDto: GetMessageDto, @Res() res) {
    const messages = await this.messagesService.findAll(getMessageDto);
    return res.json({
      data: messages
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
