import { ApiProperty } from "@nestjs/swagger";

export class MetaResponseDto {
  total: number;

  page: number;

  limit: number;
}
