import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Message } from '../../models/message.entity';
import { CreateMessageInterface } from './interfaces/create.interface';
import { PaginateMessagesInterface } from './interfaces/paginate.interface';
import { UpdateMessageInterface } from './interfaces/update.interface';

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
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          }
        },
        { $unwind: '$user' }
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

  async findOne(findOptions: any): Promise<Message> {
    return await this.messagesRepository.findOne(findOptions);
  }

  async findOneOrFail(findOptions: any): Promise<Message> {
    return await this.messagesRepository.findOneOrFail(findOptions);
  }

  async create(payload: CreateMessageInterface): Promise<Message> {
    return await this.messagesRepository.save(payload);
  }

  async update(message: Message, payload: UpdateMessageInterface): Promise<Message> {
    return await this.messagesRepository.save({
      ...message,
      ...payload
    });
  }

  async delete(criteria: any): Promise<void> {
    await this.messagesRepository.delete(criteria);
  }
}
