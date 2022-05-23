import { IsNumber, IsOptional, Max, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from 'src/app/common/enums/role.enum';

export class GetUsersDto {
	@Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

	@Type(() => Number)
  @IsNumber()
  @Min(5)
  @Max(50)
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsIn([Role.Staff, Role.User])
  role: Role
}
