import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/users/entities/user.entity";
import authConfig from 'src/config/auth.config';
import databaseConfig from 'src/config/database.config';
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UserUniqueRule } from "src/common/validations/users/user-unique.validator";
import { MatchRule } from "src/common/validations/common/match.validator";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from 'src/providers/jwt-config.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useClass: JwtConfigService
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(databaseConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserUniqueRule,
    MatchRule
  ]
})
export class AuthModule {}
