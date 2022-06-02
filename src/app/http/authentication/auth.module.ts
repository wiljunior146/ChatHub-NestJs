import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/http/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/models/user.entity';
import { UserUniqueRule } from 'src/app/common/validations/users/user-unique.validator';
import appConfig from 'src/config/app';
import databaseConfig from 'src/config/database';
import { MailsModule } from 'src/app/mails/mails.module';
import { BullModule } from '@nestjs/bull';
import { MailsService } from 'src/app/mails/mails.service';
import { MatchRule } from 'src/app/common/validations/common/match.validator';
import { AuthConsumer } from 'src/app/jobs/auth.consumer';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    MailsModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.secretKey'),
        signOptions: {
          expiresIn: config.get<string>('app.signOptions.expiresIn')
        }
      })
    }),
    BullModule.registerQueue({
      name: 'auth'
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    UserUniqueRule,
    MatchRule,
    MailsService,
    AuthConsumer
  ]
})

export class AuthModule {}
