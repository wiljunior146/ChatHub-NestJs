import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({
    message: 'The username is required.'
  })
  @IsString({
    message: 'The username must be a string.'
  })
  @MaxLength(255, {
    message: 'The username must not be greater than $constraint1 characters.'
  })
  username: string;

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
}
