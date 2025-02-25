import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createMeetupDto: CreateMeetupDto) {
    const user = req.user;
    return this.meetupService.create({ ...createMeetupDto, users: user.id });
  }

  @Get()
  findAll() {
    return this.meetupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(+id, updateMeetupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetupService.remove(+id);
  }
}
