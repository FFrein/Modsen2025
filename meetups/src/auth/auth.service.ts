import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
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

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '3m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '6d',
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
        throw new Error('Пользователь не найден');
      }
      return this.login(user);
    } catch (error) {
      throw new Error('Невалидный refresh-токен');
    }
  }
}
