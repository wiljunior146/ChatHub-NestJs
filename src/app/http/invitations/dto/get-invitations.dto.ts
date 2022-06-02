import { IsIn, IsInt, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { InvitationType } from 'src/app/common/enums/invitation-type.enum';

export class GetInvitationsDto {
	@Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(100)
  limit: number;

	@Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @IsString()
  @IsIn([InvitationType.Sent, InvitationType.Received])
  type: InvitationType;
}
