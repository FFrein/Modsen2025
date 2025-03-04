import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userDto } from 'src/auth/dto/payloadDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
    });
  }

  async validate(payload: userDto) {
    //console.log('JwtStrategy', payload);
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
