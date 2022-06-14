import databaseConfig from '../config/database.config';
import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigType } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private databaseConfiguration: ConfigType<typeof databaseConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.databaseConfiguration.host,
      port: this.databaseConfiguration.port,
      username: this.databaseConfiguration.username,
      password: this.databaseConfiguration.password,
      database: this.databaseConfiguration.database,
      synchronize: this.databaseConfiguration.synchronize,
      autoLoadEntities: true
    };
  }
}
