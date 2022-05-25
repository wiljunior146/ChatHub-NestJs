import { IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Length(1, 255)
  content: string;

  @IsString()
  contactId: string
}
