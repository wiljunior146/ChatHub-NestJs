import { Injectable } from '@nestjs/common';
import { Transform, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MessageInterface } from 'src/app/models/interfaces/message.interface';

@Injectable()
export class MessageResource implements MessageInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  content: string;

  senderId: string;

  contactId: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<MessageResource>) {
    Object.assign(this, partial);
  }
}
