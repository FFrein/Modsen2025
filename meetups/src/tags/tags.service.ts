import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MeetupTags, Prisma } from '@prisma/client';

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
