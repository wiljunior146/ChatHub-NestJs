import { IsInt, Max, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMessageDto {
	@IsOptional()
	@Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(100)
  limit: number;

	@IsOptional()
	@Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;
}
