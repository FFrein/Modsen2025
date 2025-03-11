import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { userDto } from './dto/payloadDto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(username: string, pass: string): Promise<userDto | null> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;

    const compare = await this.passwordService.comparePasswords(
      pass,
      user.password,
    );
    if (compare) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: userDto) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES || '60s',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '120s',
      secret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
      });
      const user = await this.usersService.findOne(payload.username);
      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Невалидный refresh-токен');
    }
  }
}
