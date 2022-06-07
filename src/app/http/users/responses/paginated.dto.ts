import { ApiProperty } from "@nestjs/swagger";

export class PaginatedDto {
  @ApiProperty()
  meta: object;

  data: any[];
}
