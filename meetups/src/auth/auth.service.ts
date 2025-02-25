import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    //console.log('2) validateUser');
    const user = await this.usersService.findOne(username);
    if (user == null) return null;

    const compare = await this.passwordService.comparePasswords(
      pass,
      user?.password,
    );

    if (compare) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    //console.log('login');
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
