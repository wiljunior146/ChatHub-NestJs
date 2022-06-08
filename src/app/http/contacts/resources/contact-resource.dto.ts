import { Transform, Expose } from 'class-transformer';
import { ContactInterface } from 'src/app/entities/interfaces/contact.interface';
import { ObjectID } from 'mongodb';
import { User } from 'src/app/entities/user.entity';
import { ContactUserResourceDto } from './contact-user-resource.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ContactResourceDto implements ContactInterface {
  @ApiProperty({ name: 'id', type: String })
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectID;

  @ApiProperty({ name: 'userId', type: String })
  @Transform(({ value }) => value.toString())
  userId: ObjectID;

  @ApiProperty({ name: 'contactableId', type: String })
  @Transform(({ value }) => value.toString())
  contactableId: ObjectID;

  @ApiProperty({ name: 'contactable', type: ContactUserResourceDto })
  @Transform(({ value }) => new ContactUserResourceDto(value))
  contactable: User;

  @ApiProperty({ name: 'id', type: String })
  @Transform(({ value }) => value.toString())
  roomId: ObjectID;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<ContactResourceDto>) {
    Object.assign(this, partial);
  }
}
