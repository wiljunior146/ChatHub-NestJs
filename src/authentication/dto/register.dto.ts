import { IsString, Length, Validate } from 'class-validator';
import { UserUnique } from 'src/common/decorators/user-unique.decorator';

export class RegisterDto {
  @IsString()
  @Length(1, 255)
  first_name: string;

  @IsString()
  @Length(1, 255)
  last_name: string;

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
