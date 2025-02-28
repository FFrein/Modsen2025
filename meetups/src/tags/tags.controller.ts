import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { MeetupService } from 'src/meetup/meetup.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly meetupService: MeetupService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание тэга' })
  @ApiResponse({ status: 200, description: 'Успешное создание' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
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
  @ApiResponse({ status: 200, description: 'Успешное получение' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
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
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 500, description: 'Ошибка' })
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
