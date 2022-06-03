import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Match } from 'src/app/common/decorators/validations/common/match.decorator';

export class UpdatePasswordRequestDto {
  @IsNotEmpty({
    message: 'The password is required.'
  })
  @IsString({
    message: 'The password must be a string.'
  })
  @MaxLength(100, {
    message: 'The password must not be greater than $constraint1 characters.'
  })
  password: string;

  @IsNotEmpty({
    message: 'The password confirmation is required.'
  })
  @IsString({
    message: 'The password confirmation must be a string.'
  })
  @Match('password', {
    message: 'The password confirmation does not match.'
  })
  passwordConfirmation: string;
}
