import { IsString, Length } from 'class-validator';
import { UserUnique } from 'src/app/common/decorators/validations/user-unique.decorator';

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
