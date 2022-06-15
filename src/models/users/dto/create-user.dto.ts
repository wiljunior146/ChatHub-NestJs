import {
  UserUnique
} from "src/common/decorators/validations/users/user-unique.decorator";
import {
  isEmailMessage,
  isNotEmptyMessage,
  isStringMessage,
  maxLengthMessage,
  userUniqueMessage
} from "src/lang/validation.lang";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: isNotEmptyMessage('first name') })
  @IsString({ message: isStringMessage('first name') })
  @MaxLength(255, { message: maxLengthMessage('first name') })
  firstName: string;

  @IsNotEmpty({ message: isNotEmptyMessage('last name') })
	@IsString({ message: isStringMessage('last name') })
  @MaxLength(255, { message: maxLengthMessage('last name') })
  lastName: string;

  @IsNotEmpty({ message: isNotEmptyMessage('username') })
  @IsString({ message: isStringMessage('username') })
  @MaxLength(255, { message: maxLengthMessage('username') })
  @UserUnique({ message: userUniqueMessage('username') })
  username: string;

  @IsNotEmpty({ message: isNotEmptyMessage('email') })
  @IsString({ message: isStringMessage('email') })
  @IsEmail({}, { message: isEmailMessage() })
  @MaxLength(255, { message: maxLengthMessage('email') })
  @UserUnique({ message: userUniqueMessage('email') })
  email: string;
}
