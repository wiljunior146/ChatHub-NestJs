import { Injectable } from '@nestjs/common';
import { Role } from 'src/app/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { Message } from 'src/app/models/message.entity';
import { UserInterface } from 'src/app/models/interfaces/user.interface';
import { Contact } from 'src/app/models/contact.entity';
import { roleText } from 'src/app/models/getters/user.getter';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserResource implements UserInterface {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  firstName: string;

  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  username: string;

  email: string;

  @Exclude()
  password: string;

  @Transform(roleText)
  role: Role;

  createdAt: Date;

  updatedAt: Date;

  messages: Message[];

  contacts: Contact[];

  contactables: Contact[];

  constructor(partial: Partial<UserResource>) {
    Object.assign(this, partial);
  }
}
