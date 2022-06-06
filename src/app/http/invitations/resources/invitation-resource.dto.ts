import { Injectable } from '@nestjs/common';
import { Transform, Expose, Exclude } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { MessageInterface } from 'src/app/entities/interfaces/message.interface';
import { User } from 'src/app/entities/user.entity';
import { UserResourceDto } from './user-resource.dto';

@Injectable()
export class InvitationResourceDto implements MessageInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectID;

  @Transform(({ value }) => value.toString())
  userId: ObjectID;

  @Transform(({ value }) => new UserResourceDto(value))
  user: User;

  @Transform(({ value }) => value.toString())
  invitedUserId: ObjectID;

  @Transform(({ value }) => new UserResourceDto(value))
  invitedUser: User;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<InvitationResourceDto>) {
    Object.assign(this, partial);
  }
}
