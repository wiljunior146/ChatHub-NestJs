import { PickType } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';
import {
  UserUniqueWithIgnore
} from 'src/common/decorators/validations/users/user-unique-with-ignore.decorator';
import {
  isEmailOption,
  isNotEmptyOption,
  isStringOption,
  maxLengthOption,
  userUniqueOption
} from 'src/common/helpers/validation.helper';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(
  CreateUserDto,
  ['firstName', 'lastName'] as const
) {
  @UserUniqueWithIgnore(userUniqueOption())
  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  username: string;

  @UserUniqueWithIgnore(userUniqueOption())
  @IsEmail({}, isEmailOption())
  @MaxLength(255, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  email: string;

  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
