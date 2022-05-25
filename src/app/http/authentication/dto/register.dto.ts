import { IsString, Length } from 'class-validator';
import { UserUnique } from 'src/app/common/decorators/validations/users/user-unique.decorator';

export class RegisterDto {
  @IsString()
  @Length(1, 255)
  firstName: string;

  @IsString()
  @Length(1, 255)
  lastName: string;

  @IsString()
  @Length(1, 255)
  @UserUnique()
  username: string;

  @IsString()
  @Length(1, 255)
  @UserUnique()
  email: string;

  @IsString()
  @Length(1, 255)
  password: string;
}
