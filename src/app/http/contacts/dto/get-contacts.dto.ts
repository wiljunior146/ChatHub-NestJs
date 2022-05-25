import { IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetContactsDto {
	@Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

	@Type(() => Number)
  @IsNumber()
  @Min(5)
  @Max(50)
  limit: number;
}
