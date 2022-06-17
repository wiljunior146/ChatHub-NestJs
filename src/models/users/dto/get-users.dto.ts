import {
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsIn
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import {
  isInOption,
  isIntOption,
  isNotEmptyOption,
  maxOption,
  minOption
} from 'src/common/helpers/validation.helper';

export class GetUsersDto {
  @Min(1, minOption())
  @IsInt(isIntOption())
  @IsNotEmpty(isNotEmptyOption())
  page: number;

  @Max(100, maxOption())
  @Min(5, minOption())
  @IsInt(isIntOption())
  @IsNotEmpty(isNotEmptyOption())
  limit: number;

  @IsIn([Role.Staff, Role.User], isInOption())
  @IsOptional()
  role: Role
}
