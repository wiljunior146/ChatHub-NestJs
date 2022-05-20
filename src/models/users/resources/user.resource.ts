import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { Message } from 'src/models/messages/entities/message.entity';

@Injectable()
export class UserResource {
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

  role: Role;

  created_at: Date;

  updated_at: Date;

  sent_messages: Message[]

  recieved_messages: Message[]

  constructor(partial: Partial<UserResource>) {
    Object.assign(this, partial);
  }
}
