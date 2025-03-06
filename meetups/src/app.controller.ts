import {
  Body,
  Controller,
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

import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/dto/AuthLoginDto';
import { LocalAuthGuard } from './auth/guards/local/local-auth.guard';
import { RefreshTokenDto } from './auth/dto/refresh-token.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { PasswordService } from './auth/password.service';
import { UsersService } from './users/users.service';
import { EApiResponses } from './consts/swagger';
@ApiTags('auth')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private passwordService: PasswordService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @Post('auth/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
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
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
