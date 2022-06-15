import { Role } from 'src/common/enums/role.enum';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UserResourceDto {
  id: number;

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

  role: Role;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<UserResourceDto>) {
    Object.assign(this, partial);
  }
}
