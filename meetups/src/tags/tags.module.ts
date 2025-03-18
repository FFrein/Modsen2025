import { Module } from '@nestjs/common';
import { MeetupService } from 'src/meetup/meetup.service';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, MeetupService],
  exports: [TagsService],
})
export class TagsModule {}
