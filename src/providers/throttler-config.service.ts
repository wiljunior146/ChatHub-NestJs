import routerConfig from '../config/router.config';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from '@nestjs/config';
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(
    @Inject(routerConfig.KEY)
    private routerConfiguration: ConfigType<typeof routerConfig>,
  ) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.routerConfiguration.ttl,
      limit: this.routerConfiguration.limit,
    };
  }
}
