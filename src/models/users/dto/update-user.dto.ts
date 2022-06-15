import { PickType } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';
import { UserUniqueWithIgnore } from 'src/common/decorators/validations/users/user-unique-with-ignore.decorator';
import { isEmailMessage, isNotEmptyMessage, isStringMessage, maxLengthMessage, userUniqueMessage } from 'src/lang/validation.lang';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(
  CreateUserDto,
  ['firstName', 'lastName'] as const
) {
  @IsNotEmpty({ message: isNotEmptyMessage('username') })
  @IsString({ message: isStringMessage('username') })
  @MaxLength(255, { message: maxLengthMessage('username') })
  @UserUniqueWithIgnore({ message: userUniqueMessage('username') })
  username: string;

  @IsNotEmpty({ message: isNotEmptyMessage('email') })
  @IsString({ message: isStringMessage('email') })
  @IsEmail({}, { message: isEmailMessage() })
  @MaxLength(255, { message: maxLengthMessage('email') })
  @UserUniqueWithIgnore({ message: userUniqueMessage('email') })
  email: string;

  /**
   * The REQUEST_CONTEXT is the property that will be injected to DTO for custom validation.
   * 
   * @note If whitelist is true the unexpected or not registered property in DTO
   *       will be removed so it will cause an error on validation if
   *       the REQUEST_CONTEXT is not defined in DTO.
   * 
   *       This property will be stripped so it won't be used in controller.
   * 
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
