import {
  IsString,
  Length,
  Validate,
  IsEmail,
  IsObject
} from 'class-validator';
import {
  UserUniqueExceptCurrentUser
} from 'src/app/common/decorators/validations/user-unique-except-current-user.decorator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';

export class UpdateProfileDto {
  @IsString()
  @Length(1, 255)
  first_name: string;

  @IsString()
  @Length(1, 255)
  last_name: string;

  @IsString()
  @IsEmail()
  @Length(1, 255)
  @UserUniqueExceptCurrentUser()
  email: string;

  /**
   * REQUEST_CONTEXT must be registered on dto as property
   * with decorator if the whitelist is true.
   * 
   * @note If whitelist is true the property without decorator will be removed and will cause an error.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  app/common/interceptors/inject.user.interceptor.ts that used by UserUniqueExceptCurrentUser.
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsObject()
  [REQUEST_CONTEXT]: any;
}
