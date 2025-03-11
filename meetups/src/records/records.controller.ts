import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt-auth.guard';
import { EApiResponses } from '../consts/swagger';
import { AuthRequestDto } from '../dto/requestDto';

import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание записи' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: AuthRequestDto,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.recordsService.create({
      meetup: {
        connect: { id: createRecordDto.meetupId },
      },
      users: {
        connect: { id: req.user.id },
      },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получение записей' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard)
  @Get('/my')
  findOne(@Request() req: AuthRequestDto) {
    return this.recordsService.findMy(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление записи' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req: AuthRequestDto, @Param('id') id: string) {
    const intId = parseInt(id);

    if (isNaN(intId)) {
      throw new Error('Некорректный идентификатор');
    }

    const isOwner = await this.recordsService.getOne(req.user.id, intId);
    if (isOwner) {
      return this.recordsService.remove(intId, req.user.id);
    } else {
      throw Error('Вы не можете удалить эту запись');
    }
  }
}
