import { Injectable } from '@nestjs/common';
import { Transform, Expose, Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { MessageInterface } from 'src/app/models/interfaces/message.interface';
import { User } from 'src/app/models/user.entity';
import { UserResourceDto } from './user-resource.dto';

@Injectable()
export class InvitationResourceDto implements MessageInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Transform(({ value }) => value.toString())
  userId: ObjectId;

  @Transform(({ value }) => new UserResourceDto(value))
  user: User;

  @Transform(({ value }) => value.toString())
  invitedUserId: ObjectId;

  @Transform(({ value }) => new UserResourceDto(value))
  invitedUser: User;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<InvitationResourceDto>) {
    Object.assign(this, partial);
  }
}
