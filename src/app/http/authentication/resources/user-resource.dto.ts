import { Injectable } from '@nestjs/common';
import { Role } from 'src/app/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { Message } from 'src/app/entities/message.entity';
import { UserInterface } from 'src/app/entities/interfaces/user.interface';
import { Contact } from 'src/app/entities/contact.entity';
import { roleText } from 'src/app/entities/getters/user.getter';
import { ObjectID } from 'mongodb';

@Injectable()
export class UserResourceDto implements UserInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectID;

  firstName: string;

  lastName: string;

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

  constructor(partial: Partial<UserResourceDto>) {
    Object.assign(this, partial);
  }
}
