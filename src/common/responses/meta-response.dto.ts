import { ApiProperty } from "@nestjs/swagger";

export class MetaResponseDto {
  @ApiProperty()
  total: number

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
