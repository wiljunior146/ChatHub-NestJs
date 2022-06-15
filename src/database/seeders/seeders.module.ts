import { Module } from '@nestjs/common';
import { UsersSeederModule } from './users/users-seeder.module';
import { UsersSeederService } from './users/users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Message } from 'src/models/messages/entities/message.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Contact } from 'src/models/contacts/entities/contact.entity';
import { Seeder } from './seeder';
import databaseConfig from 'src/config/database.config';
import { Invitation } from 'src/models/invitations/entities/invitation.entity';
import appConfig from 'src/config/app.config';
import { TypeOrmConfigService } from 'src/providers/type-orm-config.service';

@Module({
  imports: [
    UsersSeederModule,
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useClass: TypeOrmConfigService
    }),
    TypeOrmModule.forFeature([
      User,
      Contact,
      Message,
      Invitation
    ])
  ],
  providers: [UsersSeederService, Seeder]
})

export class SeedersModule {}
