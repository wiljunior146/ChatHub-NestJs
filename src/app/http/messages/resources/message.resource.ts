import { Injectable } from '@nestjs/common';
import { Transform, Expose, Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MessageInterface } from 'src/app/models/interfaces/message.interface';
import { User } from 'src/app/models/user.entity';
import { UserResource } from './user.resource';

@Injectable()
export class MessageResource implements MessageInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  content: string;

  @Transform(({ value }) => value.toString())
  userId: ObjectId;

  @Transform(({ value }) => new UserResource(value))
  user: User;

  @Exclude()
  roomId: ObjectId;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<MessageResource>) {
    Object.assign(this, partial);
  }
}
