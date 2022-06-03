import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
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
    const { skip, limit, roomId } = payload;
    const messages = await this.messagesRepository
      .aggregate([
        { $match: { roomId }},
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
    const total = await this.messagesRepository.count({ roomId });

    return {
      data: messages,
      meta: { total, skip, limit }
    };
  }

  async create(payload: CreateMessageInterface): Promise<Message> {
    return await this.messagesRepository.save(payload);
  }

  async update(
    user: User,
    findOptions: any,
    payload: UpdateMessageInterface
  ): Promise<Message> {
    const message = await this.messagesRepository.findOneOrFail(findOptions);

    if (! message.userId.equals(user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return await this.messagesRepository.save({
      ...message,
      ...payload
    });
  }

  async delete(user: User, findOptions: any): Promise<Message> {
    const message = await this.messagesRepository.findOneOrFail(findOptions);

    if (! message.userId.equals(user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.messagesRepository.delete(findOptions);
    return message;
  }
}
