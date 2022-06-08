import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class TokenResourceDto {
  @ApiProperty({ name: 'accessToken' })
  @Expose({ name: 'accessToken' })
  access_token: string;

  constructor(partial: Partial<TokenResourceDto>) {
    Object.assign(this, partial);
  }
}
