import { Expose } from "class-transformer";

export class TokenResourceDto {
  @Expose({ name: 'accessToken' })
  access_token: string;

  constructor(partial: Partial<TokenResourceDto>) {
    Object.assign(this, partial);
  }
}
