import { Injectable } from '@nestjs/common';
import { Transform, Expose, Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MessageInterface } from 'src/app/models/interfaces/message.interface';
import { User } from 'src/app/models/user.entity';

@Injectable()
export class InvitationResource implements MessageInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Transform(({ value }) => value.toString())
  userId: ObjectId;

  @Transform(({ value }) => value.toString())
  invitedUserId: ObjectId;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<InvitationResource>) {
    Object.assign(this, partial);
  }
}
