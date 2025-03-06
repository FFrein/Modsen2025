import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EApiResponses } from 'src/consts/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';

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
  create(@Request() req, @Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create({
      meetup: {
        connect: { id: createRecordDto.meetupId },
      },
      user: {
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
  findOne(@Request() req) {
    return this.recordsService.findMy(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление записи' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
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
