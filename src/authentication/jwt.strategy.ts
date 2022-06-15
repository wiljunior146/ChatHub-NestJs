import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { MongoRepository } from 'typeorm';
import authConfig from 'src/config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfiguration.secretKey
    });
  }

  async validate(payload: any) {
    const user = this.usersRepository.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
