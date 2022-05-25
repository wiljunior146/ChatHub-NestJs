import { Injectable } from '@nestjs/common';
import { Transform, Expose } from 'class-transformer';
import { ContactInterface } from 'src/app/models/interfaces/contact.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class ContactResource implements ContactInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<ContactResource>) {
    Object.assign(this, partial);
  }
}
