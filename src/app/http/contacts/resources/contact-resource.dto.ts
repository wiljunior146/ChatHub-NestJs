import { Injectable } from '@nestjs/common';
import { Transform, Expose } from 'class-transformer';
import { ContactInterface } from 'src/app/models/interfaces/contact.interface';
import { ObjectId } from 'mongodb';
import { User } from 'src/app/models/user.entity';
import { UserResource } from './user-resource.dto';

@Injectable()
export class ContactResourceDto implements ContactInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Transform(({ value }) => value.toString())
  userId: ObjectId;

  @Transform(({ value }) => value.toString())
  contactableId: ObjectId;

  @Transform(({ value }) => new UserResource(value))
  contactable: User;

  @Transform(({ value }) => value.toString())
  roomId: ObjectId;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<ContactResourceDto>) {
    Object.assign(this, partial);
  }
}
