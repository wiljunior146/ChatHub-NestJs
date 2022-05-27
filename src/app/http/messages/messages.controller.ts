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
  HttpException,
  HttpStatus,
  Delete
 } from '@nestjs/common';
import { MessagesService } from '../../services/messages/messages.service';
import { GetMessagesDto } from './dto/get-messages.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { Role } from 'src/app/common/enums/role.enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { MessageResource } from './resources/message.resource';
import { ObjectId } from 'mongodb';
import {
  InjectUserToBody,
  InjectUserToQuery
} from 'src/app/common/decorators/inject.user.decorator';
import { Console } from 'console';

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @InjectUserToQuery()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@Query() query: GetMessagesDto) {
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

  @Post()
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() body: CreateMessageDto, @Request() req) {
    const { roomId, ...data }: any = body;
    const payload = {
      roomId: new ObjectId(roomId),
      senderId: req.user._id,
      ...data
    };
    const message = await this.messagesService.create(payload);

    return new MessageResource(message);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateMessageDto,
    @Request() req
  ) {
    const message = await this.messagesService.findOneOrFail(id);

    if (! message.userId.equals(req.user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const updatedMessage = await this.messagesService.update(message, body);
    return new MessageResource(updatedMessage);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async destroy(
    @Param('id') id: string,
    @Request() req
  ) {
    const message = await this.messagesService.findOneOrFail(id);

    if (! message.userId.equals(req.user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    this.messagesService.delete(message);
    return new MessageResource(message);
  }
}
