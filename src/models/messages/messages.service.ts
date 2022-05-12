import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, getMongoManager } from 'typeorm';
import { Message } from './entities/message.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly  messagesRepository: MongoRepository<Message>,
  ) {}

  async findAll() {
    const messages = await this.messagesRepository
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            foreignField: '_id',
            as: 'sender',
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'receiver',
            foreignField: '_id',
            as: 'receiver',
          }
        }
      ])
      .next();
    return messages;
  }

  async findOne(id: string): Promise<Message> {
    return await this.messagesRepository.findOne({ id: id });
  }

  async create(payload: any): Promise<Message> {
    const data = {
      ...payload,
      created_at: new Date,
      updated_at: new Date
    };
    return this.messagesRepository.save(data);
  }

  async remove(id: string): Promise<Message> {
    const message = this.messagesRepository.findOneOrFail(id);
    await this.messagesRepository.delete(id);
    return message;
  }
}
