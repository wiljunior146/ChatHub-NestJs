import { Injectable } from '@nestjs/common';
import { Transform, Expose } from 'class-transformer';
import { ContactInterface } from 'src/app/models/interfaces/contact.interface';
import { ObjectId } from 'mongodb';
import { User } from 'src/app/models/user.entity';
import { UserResource } from './user.resource';

@Injectable()
export class ContactResource implements ContactInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Expose({ name: 'user_id' })
  @Transform(({ value }) => value.toString())
  userId: ObjectId;

  @Expose({ name: 'contactable_id' })
  @Transform(({ value }) => value.toString())
  contactableId: ObjectId;

  @Transform(({ value }) => new UserResource(value))
  contactable: User;

  @Expose({ name: 'room_id' })
  @Transform(({ value }) => value.toString())
  roomId: ObjectId;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<ContactResource>) {
    Object.assign(this, partial);
  }
}
