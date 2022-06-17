import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength
} from "class-validator";
import { REQUEST_CONTEXT } from "src/common/constants/request.constant";
import {
  Same
} from "src/common/decorators/validations/common/same.decorator";
import {
  UserPassword
} from "src/common/decorators/validations/users/user-password.decorator";
import {
  isNotEmptyOption,
  isStringOption,
  maxLengthOption,
  sameOption,
  userPasswordOption
} from "src/common/helpers/validation.helper";

export class UpdatePasswordDto {
  @UserPassword(userPasswordOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  currentPassword: string;

  @MaxLength(100, maxLengthOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  newPassword: string;

  @Same('newPassword', sameOption())
  @IsString(isStringOption())
  @IsNotEmpty(isNotEmptyOption())
  confirmNewPassword: string;

  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
