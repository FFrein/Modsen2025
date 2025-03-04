import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/guards/role/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role/roles.guard';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupService } from './meetup.service';

@ApiTags('meetup')
@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание митапа' })
  @ApiResponse({ status: 200, description: 'Успешное создание' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.creator)
  create(@Request() req, @Body() createMeetupDto: CreateMeetupDto) {
    const user = req.user;
    return this.meetupService.create({
      ...createMeetupDto,
      users: {
        connect: { id: user.id },
      },
    });
  }

  @ApiOperation({ summary: 'Получение митапов' })
  @ApiResponse({ status: 200, description: 'Успешное получение митапов' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.meetupService.findAll(query);
  }

  @ApiOperation({ summary: 'Получение митапа по id' })
  @ApiResponse({ status: 200, description: 'Успешное получение митапа' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновление митапа' })
  @ApiResponse({ status: 200, description: 'Успешное обновление' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.creator)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMeetupDto: UpdateMeetupDto,
  ) {
    const intId = parseInt(id);

    if (isNaN(intId)) {
      throw new Error('Некорректный идентификатор');
    }
    const isOwner = await this.meetupService.checkOwner(req.user.id, intId);
    if (isOwner) {
      return this.meetupService.update(+id, updateMeetupDto);
    } else {
      throw Error('Вы не можете редактировать эту запись');
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление митапа' })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.creator)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const intId = parseInt(id);

    if (isNaN(intId)) {
      throw new Error('Некорректный идентификатор');
    }

    const isOwner = await this.meetupService.checkOwner(req.user.id, intId);
    if (isOwner) {
      return this.meetupService.remove(+id);
    } else {
      throw Error('Вы не можете удалить эту запись');
    }
  }
}
