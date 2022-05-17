import { IsString, IsNumber, Length } from 'class-validator';
import { Match } from 'src/common/decorators/validations/match.decorator';

export class UpdatePasswordDto {
  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  @Match('password')
  password_confirmation: string;
}
