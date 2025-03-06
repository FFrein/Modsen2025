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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role/roles.guard';
import { MeetupService } from 'src/meetup/meetup.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { EApiResponses } from 'src/consts/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly meetupService: MeetupService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание тэга' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.NOT_PERMISSION)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Request() req, @Body() createTagDto: CreateTagDto) {
    const isOwner = await this.meetupService.checkOwner(
      req.user.id,
      createTagDto.meetupId,
    );

    if (isOwner) {
      return this.tagsService.create({
        tag: createTagDto.tag,
        meetup: {
          connect: { id: createTagDto.meetupId },
        },
      });
    } else {
      throw Error('Вы не можете добавить тэг чужой записи');
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Поличение списка тэгов записи' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.NOT_PERMISSION)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const intId = parseInt(id);

    if (isNaN(intId)) {
      throw new Error('Некорректный идентификатор');
    }
    return this.tagsService.findByMeetupId(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление тэга' })
  @ApiResponse(EApiResponses.SUCCESS)
  @ApiResponse(EApiResponses.NOT_AUTH)
  @ApiResponse(EApiResponses.NOT_PERMISSION)
  @ApiResponse(EApiResponses.SERVER_ERROR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const intId = parseInt(id);

    if (isNaN(intId)) {
      throw new Error('Некорректный идентификатор');
    }
    return this.tagsService.remove(+id);
  }
}
