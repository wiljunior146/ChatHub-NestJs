import { IsString, Length } from 'class-validator';
import {
  UserCanViewContactRoom
} from 'src/app/common/decorators/validations/contacts/user-can-view-contact-room.decorator';

export class CreateMessageDto {
  @IsString()
  @Length(1, 3000)
  content: string;

  @IsString()
  @UserCanViewContactRoom()
  roomId: string
}
