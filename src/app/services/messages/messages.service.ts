import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, getMongoManager } from 'typeorm';
import { Message } from '../../models/message.entity';

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
        },
        { $unwind: '$receiver' },
        { $unwind: '$sender' }
      ])
      .limit(1)
      .toArray();
    return messages;
  }

  async findOne(id: string): Promise<Message> {
    return await this.messagesRepository.findOne({ _id: id });
  }

  async create(payload: object): Promise<Message> {
    const data = {
      ...payload,
      created_at: new Date,
      updated_at: new Date
    };
    return await this.messagesRepository.save(data);
  }

  async remove(id: string): Promise<Message> {
    const message = this.messagesRepository.findOneOrFail(id);
    await this.messagesRepository.delete(id);
    return message;
  }
}
