import { IsInt, Max, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import {
  UserCanViewContactRoom
} from 'src/app/common/decorators/validations/contacts/user-can-view-contact-room.decorator';

export class GetMessageDto {
	@Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(100)
  limit: number;

	@Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;

  @IsString()
  @UserCanViewContactRoom()
  roomId: string;
}
