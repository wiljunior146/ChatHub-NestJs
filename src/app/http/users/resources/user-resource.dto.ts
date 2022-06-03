import { Injectable } from '@nestjs/common';
import { Role } from 'src/app/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { UserInterface } from 'src/app/models/interfaces/user.interface';
import { roleText } from 'src/app/models/getters/user.getter';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserResourceDto implements UserInterface {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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

  constructor(partial: Partial<UserResourceDto>) {
    Object.assign(this, partial);
  }
}
