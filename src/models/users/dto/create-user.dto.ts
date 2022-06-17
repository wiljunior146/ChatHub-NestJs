import {
  UserUnique
} from "src/common/decorators/validations/users/user-unique.decorator";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength
} from "class-validator";
import {
  maxLengthOption,
  isStringOption,
  isNotEmptyOption,
  userUniqueOption,
  isEmailOption
} from 'src/common/helpers/validation.helper';

export class CreateUserDto {
  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  firstName: string;

  @MaxLength(255, maxLengthOption())
	@IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  lastName: string;

  @UserUnique(userUniqueOption())
  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  username: string;

  @UserUnique(userUniqueOption())
  @IsEmail(isEmailOption())
  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  email: string;
}
