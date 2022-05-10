import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return await new this.messageModel(createMessageDto).save();
  }

  async findAll(payload: any) {
    const skip: number = payload.skip
      ? payload.skip
      : 0;
    const limit: number = payload.limit
      ? payload.limit
      : 10;
    const messages = await this.messageModel
      .find()
      .skip(skip)
      .limit(limit);
    const total = await this.messageModel
      .find()
      .count();

    return messages;
  }

  async findOne(id: string) {
    return await this.messageModel.findById(new ObjectId(id));
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return await this.messageModel.findByIdAndUpdate(
      new ObjectId(id),
      updateMessageDto
    );
  }

  async remove(id: string) {
    return await this.messageModel.findByIdAndDelete(new ObjectId(id));
  }
}
