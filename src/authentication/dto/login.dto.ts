/**
 * This DTO will be only used for swagger since the payloads
 * will be handled by LocalAuthGuard
 * so there will be no validations that will be used.
 */
export class LoginDto {
  username: string;

  password: string;
}
