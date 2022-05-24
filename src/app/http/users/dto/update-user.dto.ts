import {
  IsString,
  Length,
  IsEmail,
  IsDefined
} from 'class-validator';
import {
  UserUniqueWithIgnore
} from 'src/app/common/decorators/validations/user-unique-with-ignore.decorator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';

export class UpdateUserDto {
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
