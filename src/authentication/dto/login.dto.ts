import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  isNotEmptyMessage,
  isStringMessage,
  maxLengthMessage
} from 'src/lang/validation.lang';

export class LoginDto {
  @IsNotEmpty({ message: isNotEmptyMessage('username') })
  @IsString({ message: isStringMessage('username') })
  @MaxLength(255, { message: maxLengthMessage('username') })
  username: string;

  @IsNotEmpty({ message: isNotEmptyMessage('password') })
  @IsString({ message: isStringMessage('password') })
  @MaxLength(255, { message: maxLengthMessage('password') })
  password: string;
}
