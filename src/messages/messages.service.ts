import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return new this.messageModel(createMessageDto).save();
  }

  async paginate(payload: any) {
    const skip: number = payload.skip
      ? payload.skip
      : 0;
    const limit: number = payload.limit
      ? payload.limit
      : 10;
    const messages = this.messageModel
      .find()
      .skip(skip)
      .limit(limit);

    return messages;
  }

  async findAll() {
    return this.messageModel.find();
  }

  async findOne(id: string) {
    return this.messageModel.findById(new ObjectId(id));
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(
      new ObjectId(id),
      updateMessageDto
    );
  }

  async remove(id: string) {
    return this.messageModel.findByIdAndDelete(new ObjectId(id));
  }
}
