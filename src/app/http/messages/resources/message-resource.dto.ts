import { Injectable } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, Expose, Exclude } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { MessageInterface } from 'src/app/entities/interfaces/message.interface';
import { User } from 'src/app/entities/user.entity';
import { MessageUserResourceDto } from './message-user-resource.dto';

export class MessageResourceDto implements MessageInterface {
  @ApiProperty({ name: 'id', type: String })
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectID;

  content: string;

  @Transform(({ value }) => value.toString())
  userId: ObjectID;

  @Transform(({ value }) => new MessageUserResourceDto(value))
  user: User;

  @ApiHideProperty()
  @Exclude()
  roomId: ObjectID;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<MessageResourceDto>) {
    Object.assign(this, partial);
  }
}
