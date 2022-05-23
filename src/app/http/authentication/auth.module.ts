import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/http/users/users.module';
import { UsersService } from 'src/app/services/users/users.service';
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

@Module({
  imports: [
    UsersModule,
    PassportModule,
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
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, UserUniqueRule],
  exports: [AuthService]
})

export class AuthModule {}
