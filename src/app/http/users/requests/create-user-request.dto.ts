import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import {
  UserUnique
} from 'src/app/common/decorators/validations/users/user-unique.decorator';

export class CreateUserRequestDto {
  @IsNotEmpty({
    message: 'The first name is required.'
  })
  @IsString({
    message: 'The first name must be a string.'
  })
  @MaxLength(255, {
    message: 'The first name must not be greater than $constraint1 characters.'
  })
  firstName: string;

  @IsNotEmpty({
    message: 'The last name is required.'
  })
	@IsString({
    message: 'The last name must be a string.'
  })
  @MaxLength(255, {
    message: 'The last name must not be greater than $constraint1 characters.'
  })
  lastName: string;

  @IsNotEmpty({
    message: 'The username is required.'
  })
  @IsString({
    message: 'The username must be a string.'
  })
  @MaxLength(255, {
    message: 'The username must not be greater than $constraint1 characters.'
  })
  @UserUnique({
    message: 'The username has already been taken.'
  })
  username: string;

  @IsNotEmpty({
    message: 'The email is required.'
  })
  @IsString({
    message: 'The email must be a string.'
  })
  @IsEmail({}, {
    message: 'The email must be a valid email address.'
  })
  @MaxLength(255, {
    message: 'The email must not be greater than $constraint1 characters.'
  })
  @UserUnique({
    message: 'The email has already been taken.'
  })
  email: string;
}
