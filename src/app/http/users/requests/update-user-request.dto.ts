import {
  IsString,
  IsEmail,
  IsDefined,
  IsNotEmpty,
  MaxLength
} from 'class-validator';
import {
  UserUniqueWithIgnore
} from 'src/app/common/decorators/validations/users/user-unique-with-ignore.decorator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';

export class UpdateUserRequestDto extends PickType(
  CreateUserRequestDto,
  ['firstName', 'lastName'] as const
) {
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
   *       will be removed so it will cause an error on validation since
   *       the REQUEST_CONTEXT is not present in DTO.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
