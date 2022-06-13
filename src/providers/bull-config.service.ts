import queueConfig from '../config/queue';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from '@nestjs/config';
import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(
    @Inject(queueConfig.KEY)
    private config: ConfigType<typeof queueConfig>,
  ) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.config.host,
        port: this.config.port,
        password: this.config.password,
      }
    };
  }
}
