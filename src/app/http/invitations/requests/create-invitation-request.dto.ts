import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import {
  UserCanCreateInvitation
} from 'src/app/common/decorators/validations/invitations/user-can-create-invitation.validator';

export class CreateInvitationRequestDto {
  @IsNotEmpty({
    message: 'The invited user Id is required.'
  })
  @IsString({
    message: 'The invited user Id must be a string.'
  })
  @UserCanCreateInvitation({
    message: 'The selected invited user is invalid.'
  })
  invitedUserId: string

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
