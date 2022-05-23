import { Injectable } from '@nestjs/common';
import { Role } from 'src/app/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { Message } from 'src/app/models/message.entity';
import { UserInterface } from 'src/app/models/interfaces/user.interface';
import { Contact } from 'src/app/models/contact.entity';
import { roleText } from 'src/app/models/getters/user.getter';

@Injectable()
export class UserResource implements UserInterface {
  @Transform(({ value }) => value.toString())
  _id: string;

  first_name: string;

  last_name: string;

  @Expose()
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  username: string;

  email: string;

  @Exclude()
  password: string;

  @Transform(roleText)
  role: Role;

  created_at: Date;

  updated_at: Date;

  messages: Message[];

  contacts: Contact[];

  contactables: Contact[];

  constructor(partial: Partial<UserResource>) {
    Object.assign(this, partial);
  }
}
