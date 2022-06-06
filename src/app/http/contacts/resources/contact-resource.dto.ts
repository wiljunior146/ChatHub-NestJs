import { Injectable } from '@nestjs/common';
import { Transform, Expose } from 'class-transformer';
import { ContactInterface } from 'src/app/entities/interfaces/contact.interface';
import { ObjectID } from 'mongodb';
import { User } from 'src/app/entities/user.entity';
import { UserResource } from './user-resource.dto';

@Injectable()
export class ContactResourceDto implements ContactInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectID;

  @Transform(({ value }) => value.toString())
  userId: ObjectID;

  @Transform(({ value }) => value.toString())
  contactableId: ObjectID;

  @Transform(({ value }) => new UserResource(value))
  contactable: User;

  @Transform(({ value }) => value.toString())
  roomId: ObjectID;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<ContactResourceDto>) {
    Object.assign(this, partial);
  }
}
