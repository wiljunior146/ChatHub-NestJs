import { IsString, Length } from 'class-validator';
import { Match } from 'src/app/common/decorators/validations/common/match.decorator';

export class UpdatePasswordDto {
  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  @Match('password')
  passwordConfirmation: string;
}
