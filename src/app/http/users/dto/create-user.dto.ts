import { IsString, Length, IsEmail, IsIn } from 'class-validator';
import { UserUnique } from 'src/app/common/decorators/validations/user-unique.decorator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  first_name: string;

	@IsString()
  @Length(1, 255)
  last_name: string;

  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @IsEmail()
  @Length(1, 255)
  @UserUnique()
  email: string;
}
