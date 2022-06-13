import { Module } from '@nestjs/common';
import { UsersSeederModule } from './users/users-seeder.module';
import { UsersSeederService } from './users/users-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { Message } from 'src/models/messages/entities/message.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Contact } from 'src/models/contacts/entities/contact.entity';
import { Seeder } from './seeder';
import databaseConfig from 'src/config/database';
import { Invitation } from 'src/models/invitations/entities/invitation.entity';

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
        database: config.get<string>('database.database'),
        url: config.get<string>('database.connection'),
        autoLoadEntities: true,
        synchronize: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        logging: true
      })
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
