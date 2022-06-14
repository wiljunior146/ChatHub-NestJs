import { IsNotEmpty, IsInt, Min, Max, IsOptional, IsIn } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class GetUsersDto {
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

  @IsOptional()
  @IsIn([Role.Staff, Role.User], {
    message: 'The selected role is invalid.'
  })
  role: Role
}
