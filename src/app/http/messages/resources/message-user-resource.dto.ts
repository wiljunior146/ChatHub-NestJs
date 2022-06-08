import { Injectable } from '@nestjs/common';
import { Role } from 'src/app/common/enums/role.enum';
import { Exclude, Transform, Expose } from 'class-transformer';
import { UserInterface } from 'src/app/entities/interfaces/user.interface';
import { ObjectID } from 'mongodb';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class MessageUserResourceDto implements UserInterface {
  @ApiProperty({ name: 'id', type: String })
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectID;

  firstName: string;

  lastName: string;

  @ApiProperty()
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  username: string;

  email: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiHideProperty()
  @Exclude()
  role: Role;

  @ApiHideProperty()
  @Exclude()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<MessageUserResourceDto>) {
    Object.assign(this, partial);
  }
}
