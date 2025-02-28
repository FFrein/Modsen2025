import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MeetupService } from 'src/meetup/meetup.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, MeetupService],
})
export class TagsModule {}
