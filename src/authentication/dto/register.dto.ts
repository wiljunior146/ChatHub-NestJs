import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Match } from 'src/common/decorators/validations/common/match.decorator';
import { UserUnique } from 'src/common/decorators/validations/users/user-unique.decorator';
import {
  isEmailMessage,
  isNotEmptyMessage,
  isStringMessage,
  maxLengthMessage,
  userUniqueMessage
} from 'src/lang/validation.lang';

export class RegisterDto {
  @IsNotEmpty({ message: isNotEmptyMessage('first name') })
  @IsString({ message: isStringMessage('first name') })
  @MaxLength(255, { message: maxLengthMessage('first name') })
  firstName: string;

  @IsNotEmpty({ message: isNotEmptyMessage('last name') })
	@IsString({ message: isStringMessage('last name') })
  @MaxLength(255, { message: maxLengthMessage('last name') })
  lastName: string;

  @IsNotEmpty({  message: isNotEmptyMessage('username') })
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

  @IsNotEmpty({ message: isNotEmptyMessage('password') })
  @IsString({ message: isStringMessage('password') })
  @MaxLength(255, { message: maxLengthMessage('password') })
  password: string;

  @IsNotEmpty({
    message: 'The password confirmation is required.'
  })
  @IsString({
    message: 'The password confirmation must be a string.'
  })
  @Match('password', {
    message: 'The password confirmation does not match.'
  })
  passwordConfirmation: string;
}
