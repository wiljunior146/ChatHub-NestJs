import {
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsIn
} from 'class-validator';
import {
  isNotEmptyMessage,
  isIntMessage,
  isInMessage,
  minMessage,
  maxMessage
} from 'src/lang/validation.lang';
import { Role } from 'src/common/enums/role.enum';

export class GetUsersDto {
  @IsNotEmpty({ message: isNotEmptyMessage('page') })
  @IsInt({ message: isIntMessage('page') })
  @Min(1, { message: minMessage('page') })
  page: number;

  @IsNotEmpty({ message: isNotEmptyMessage('limit') })
  @IsInt({ message: isIntMessage('limit') })
  @Min(5, { message: minMessage('limit') })
  @Max(100, { message: maxMessage('limit') })
  limit: number;

  @IsOptional()
  @IsIn([Role.Staff, Role.User], { message: isInMessage('role') })
  role: Role
}
