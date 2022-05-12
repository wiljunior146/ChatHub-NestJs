import { IsString, IsNumber, Length } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Length(1, 255)
  content: string;

  @IsString()
  receiver: string
}
