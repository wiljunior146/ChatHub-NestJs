import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';
import { Same } from 'src/common/decorators/validations/common/same.decorator';
import {
  UserUnique
} from 'src/common/decorators/validations/users/user-unique.decorator';
import {
  isEmailOption,
  isNotEmptyOption,
  isStringOption,
  maxLengthOption,
  sameOption,
  userUniqueOption
} from 'src/common/helpers/validation.helper';

export class RegisterDto {
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
  @IsEmail({}, isEmailOption())
  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  email: string;

  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  password: string;

  @IsNotEmpty(isNotEmptyOption())
  @IsString(isStringOption())
  @Same('password', sameOption())
  confirmPassword: string;
}
