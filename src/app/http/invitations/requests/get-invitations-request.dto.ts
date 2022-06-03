import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { InvitationType } from 'src/app/common/enums/invitation-type.enum';

export class GetInvitationsRequestDto {
	@Type(() => Number)
  @IsNotEmpty({
    message: 'The page is required.'
  })
  @IsInt({
    message: 'The page must be an integer.'
  })
  @Min(1, {
    message: 'The page must be at least $constraint1.'
  })
  page: number;

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

  @IsNotEmpty({
    message: 'The type is required.'
  })
  @IsString({
    message: 'The type must be a string.'
  })
  @IsIn([InvitationType.Sent, InvitationType.Received], {
    message: 'The selected type is invalid.'
  })
  type: InvitationType;
}
