import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt/jwt-auth.guard';
import { EApiResponses } from '../consts/swagger';
import { AuthRequestDto } from '../dto/requestDto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor() {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Просмотр профиля' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: AuthRequestDto): User {
    return req.user;
  }
}
