import { Injectable } from '@nestjs/common';
import { MeetupTags, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MeetupTagsCreateInput): Promise<MeetupTags> {
    return this.prisma.meetupTags.create({ data });
  }

  async findByMeetupId(id: number) {
    return this.prisma.meetupTags.findMany({ where: { meetupId: id } });
  }

  async remove(id: number) {
    return this.prisma.meetupTags.delete({ where: { id: id } });
  }
}
