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

export class UpdateProfileDto {
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
