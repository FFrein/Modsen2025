import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupService } from './meetup.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

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

  @Get()
  findAll() {
    return this.meetupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.creator)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateMeetupDto: UpdateMeetupDto,
  ) {
    this.meetupService.checkOwner(req.user.id, id).then((isOwner) => {
      if (isOwner) {
        return this.meetupService.update(+id, updateMeetupDto);
      } else {
        throw Error('Вы не можете редактировать эту запись');
      }
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.creator)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    this.meetupService.checkOwner(req.user.id, id).then((isOwner) => {
      if (isOwner) {
        return this.meetupService.remove(+id);
      } else {
        throw Error('Вы не можете удалить эту запись');
      }
    });
  }
}
