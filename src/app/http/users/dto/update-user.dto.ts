import {
  IsString,
  Length,
  IsEmail,
  IsDefined
} from 'class-validator';
import {
  UserUniqueWithIgnore
} from 'src/app/common/decorators/validations/users/user-unique-with-ignore.decorator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';

export class UpdateUserDto {
  @IsString()
  @Length(1, 255)
  firstName: string;

	@IsString()
  @Length(1, 255)
  lastName: string;

  @IsString()
  @Length(1, 255)
  @UserUniqueWithIgnore()
  username: string;

  @IsString()
  @IsEmail()
  @Length(1, 255)
  @UserUniqueWithIgnore()
  email: string;

  /**
   * REQUEST_CONTEXT must be registered on dto as property
   * with decorator if the whitelist is true.
   * 
   * @note If whitelist is true the property without decorator will be
   *       removed and will cause an error.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
   @IsDefined()
   [REQUEST_CONTEXT]: any;
}
