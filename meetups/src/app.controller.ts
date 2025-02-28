import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/dto/AuthLoginDto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RefreshTokenDto } from './auth/dto/refresh-token.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, description: 'Успешная авториация' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({ status: 200, description: 'Новые токены' })
  @ApiResponse({ status: 401, description: 'Невалидный refresh-токен' })
  @Post('auth/refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      return await this.authService.refreshToken(refreshTokenDto.refresh_token);
    } catch (error) {
      throw new UnauthorizedException('Невалидный refresh-токен');
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiResponse({ status: 200, description: 'Успешный выход' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
