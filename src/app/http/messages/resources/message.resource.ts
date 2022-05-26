import { Injectable } from '@nestjs/common';
import { Transform, Expose } from 'class-transformer';
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

  @Expose({ name: 'sender_id' })
  @Transform(({ value }) => value.toString())
  senderId: ObjectId;

  @Transform(({ value }) => new UserResource(value))
  sender: User;

  @Expose({ name: 'contact_id' })
  @Transform(({ value }) => value.toString())
  contactId: ObjectId;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<MessageResource>) {
    Object.assign(this, partial);
  }
}
