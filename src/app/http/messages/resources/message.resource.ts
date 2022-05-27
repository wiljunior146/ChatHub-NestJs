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

  @Expose({ name: 'user_id' })
  @Transform(({ value }) => value.toString())
  userId: ObjectId;

  @Transform(({ value }) => new UserResource(value))
  user: User;

  @Exclude()
  roomId: ObjectId;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<MessageResource>) {
    Object.assign(this, partial);
  }
}
