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
import { EApiResponses } from '../consts/swagger';
import { AuthRequestDto } from '../dto/requestDto';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/AuthLoginDto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { PasswordService } from './password.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordService: PasswordService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.usersService.findOne(createUserDto.username);

    if(userExist){
      throw Error("User exist")
    }

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
  @Post('/login')
  login(@Body() authLoginDto: AuthLoginDto, @Request() req: AuthRequestDto) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @Post('/refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      return await this.authService.refreshToken(refreshTokenDto.refresh_token);
    } catch {
      throw new UnauthorizedException('Невалидный refresh-токен');
    }
  }
}
