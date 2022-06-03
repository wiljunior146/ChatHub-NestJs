import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetContactsRequestDto {
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
}