import { IsOptional, Max, Min, IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from 'src/app/common/enums/role.enum';

export class GetUsersRequestDto {
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

  @Type(() => Number)
  @IsOptional()
  @IsIn([Role.Staff, Role.User], {
    message: 'The selected role is invalid.'
  })
  role: Role
}
