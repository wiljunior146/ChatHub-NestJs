import routerConfig from '../config/router';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from '@nestjs/config';
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(
    @Inject(routerConfig.KEY)
    private config: ConfigType<typeof routerConfig>,
  ) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.config.ttl,
      limit: this.config.limit
    };
  }
}
