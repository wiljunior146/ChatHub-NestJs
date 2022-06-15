import queueConfig from '../config/queue.config';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from '@nestjs/config';
import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(
    @Inject(queueConfig.KEY)
    private queueConfiguration: ConfigType<typeof queueConfig>,
  ) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.queueConfiguration.host,
        port: this.queueConfiguration.port,
        password: this.queueConfiguration.password,
      }
    };
  }
}
