import { IsDefined, IsString, Length } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
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

  /**
   * REQUEST_CONTEXT must be registered on dto as property
   * if the whitelist is true.
   * 
   * @note If whitelist is true the unexpected property
   *       will be removed and will cause an error.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
