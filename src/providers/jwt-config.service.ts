import authConfig from '../config/auth.config';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    @Inject(authConfig.KEY)
    private authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.authConfiguration.secretKey,
      signOptions: {
        expiresIn: this.authConfiguration.expiresIn,
      },
    };
  }
}
