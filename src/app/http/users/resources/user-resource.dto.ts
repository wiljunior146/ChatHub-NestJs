import { Role } from 'src/app/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { UserInterface } from 'src/app/entities/interfaces/user.interface';
import { roleText } from 'src/app/entities/getters/user.getter';
import { ObjectID } from 'mongodb';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

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

  @ApiHideProperty()
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
