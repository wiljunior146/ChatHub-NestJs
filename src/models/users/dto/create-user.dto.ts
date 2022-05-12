import { IsString, Length } from 'class-validator';

export class CreateUserDto {
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
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(1, 255)
  password: string;
}