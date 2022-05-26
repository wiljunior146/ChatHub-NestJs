import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Message } from '../../models/message.entity';
import { CreateMessageInterface } from './interfaces/create.interface';
import { PaginateMessagesInterface } from './interfaces/paginate.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: MongoRepository<Message>
  ) {}

  async paginate(payload: PaginateMessagesInterface) {
    const messages = await this.messagesRepository
      .aggregate([
        { $match: { roomId: payload.roomId } },
        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'sender',
          }
        },
        { $unwind: '$sender' }
      ])
      .limit(payload.limit)
      .skip(payload.skip)
      .toArray();
    const total = await this.messagesRepository.count({ roomId: payload.roomId });

    return {
      data: messages,
      meta: {
        total,
        skip: payload.skip,
        limit: payload.limit
      }
    };
  }

  async findOne(id: string): Promise<Message> {
    return await this.messagesRepository.findOne(id);
  }

  async create(payload: CreateMessageInterface): Promise<Message> {
    return await this.messagesRepository.save(payload);
  }

  async remove(id: string): Promise<Message> {
    const message = this.messagesRepository.findOneOrFail(id);
    await this.messagesRepository.delete(id);
    return message;
  }
}
