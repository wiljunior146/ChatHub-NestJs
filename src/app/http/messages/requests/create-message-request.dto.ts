import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import {
  UserCanViewContactRoom
} from 'src/app/common/decorators/validations/contacts/user-can-view-contact-room.decorator';

export class CreateMessageRequestDto {
  @IsNotEmpty({
    message: 'The content is required.'
  })
  @IsString({
    message: 'The content must be a string.'
  })
  @MaxLength(3000, {
    message: 'The content must not be greater than $constraint1 characters.'
  })
  content: string;

  @IsNotEmpty({
    message: 'The room Id is required.'
  })
  @IsString({
    message: 'The room Id must be a string.'
  })
  @UserCanViewContactRoom({
    message: 'The selected room is invalid.'
  })
  roomId: string

  /**
   * The REQUEST_CONTEXT is the property that will be injected to DTO for custom validation.
   * 
   * @note If whitelist is true the unexpected or not registered property in DTO
   *       will be removed so it will cause an error on validation since
   *       the REQUEST_CONTEXT is not present in DTO.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
