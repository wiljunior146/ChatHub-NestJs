import { IsInt, Max, Min, IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import {
  UserCanViewContactRoom
} from 'src/app/common/decorators/validations/contacts/user-can-view-contact-room.decorator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';

export class GetMessagesRequestDto {
	@Type(() => Number)
  @IsNotEmpty({
    message: 'The limit is required.'
  })
  @IsInt({
    message: 'The limit must be an integer.'
  })
  @Min(5, {
    message: 'The limit must be at least $constraint1.'
  })
  @Max(100, {
    message: 'The limit must not be greater than $constraint1.'
  })
  limit: number;

	@Type(() => Number)
  @IsNotEmpty({
    message: 'The skip is required.'
  })
  @IsInt({
    message: 'The skip must be an integer.'
  })
  @Min(0, {
    message: 'The skip must be at least $constraint1.'
  })
  skip: number;

  @IsNotEmpty({
    message: 'The room Id is required.'
  })
  @IsString({
    message: 'The room Id must be a string.'
  })
  @UserCanViewContactRoom({
    message: 'The selected room is invalid.'
  })
  roomId: string;

  /**
   * The REQUEST_CONTEXT is the property that will be injected to DTO for custom validation.
   * 
   * @note If whitelist is true the unexpected or not registered property in DTO
   *       will be removed so it will cause an error on validation if
   *       the REQUEST_CONTEXT is not present in DTO.
   * @see  main.ts useGlobalPipes to check if the whitelist is true (false by default).
   * @see  https://github.com/AvantaR/nestjs-validation-tips/issues/1
   */
  @IsDefined()
  [REQUEST_CONTEXT]: any;
}
