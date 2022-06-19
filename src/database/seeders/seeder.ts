import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Environment } from 'src/common/enums/environment.enum';
import appConfig from 'src/config/app.config';
import { UsersSeederService } from './users/users-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeederService: UsersSeederService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  /**
   * Seed the application's database.
   */
  async seed() {
    const environment = this.appConfiguration.env;

    await this.usersSeederService.admin();

    if (environment == Environment.Local) {
      await this.usersSeederService.users(5);
      await this.usersSeederService.staffs(2);
    }
  }
}
