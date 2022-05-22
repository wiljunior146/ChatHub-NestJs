import { Module } from '@nestjs/common';
import { UsersSeederModule } from './users/users-seeder.module';
import { UsersSeederService } from './users/users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Message } from 'src/models/messages/entities/message.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Seeder } from './seeder';

import databaseConfig from 'src/config/database';
import { Contact } from 'src/models/contacts/entities/contact.entity';

@Module({
  imports: [
    UsersSeederModule,
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get<string>('database.connection'),
        entities: [
          User,
          Contact,
          Message
        ],
        synchronize: true,
        useNewUrlParser: true,
        logging: true
      })
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersSeederService, Seeder],
})

export class SeedersModule {}
