import { PickType } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';
import { UserUniqueWithIgnore } from 'src/common/decorators/validations/users/user-unique-with-ignore.decorator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(
  CreateUserDto,
  ['firstName', 'lastName'] as const
) {
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
  @UserUniqueWithIgnore({
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
  @UserUniqueWithIgnore({
    message: 'The email has already been taken.'
  })
  email: string;

  /**
   * The REQUEST_CONTEXT is the property that will be injected to DTO for custom validation.
   * 
   * @note If whitelist is true the unexpected or not registered property in DTO
   *       will be removed so it will cause an error on validation if
   *       the REQUEST_CONTEXT is not present in DTO.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
