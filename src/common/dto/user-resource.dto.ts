import { Role } from 'src/common/enums/role.enum';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from '../../models/users/entities/user.entity';

export class UserResourceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  /**
   * Construct a new UserResourceDTO instance.
   */
  constructor(partial?: Partial<UserResourceDto>) {
    Object.assign(this, partial);
  }

  /**
   * Create a new UserResourceDto collection instance.
   */
  static collection(users: User[] = []) {
    return { data: users.map((user) => new UserResourceDto(user)) };
  }

  /**
   * Create a new UserResourceDto instance.
   */
  static make(user: User) {
    return { data: new UserResourceDto(user) };
  }
}
