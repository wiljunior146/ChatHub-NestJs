import { IsString } from 'class-validator';
import { UserExists } from 'src/app/common/decorators/validations/users/user-exists.decorator';

export class CreateInvitationDto {
  @IsString()
  @UserExists('_id')
  invitedUserId: string
}
