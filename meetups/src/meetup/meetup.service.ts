import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { PaginationDto } from './dto/pagination.dto';
import { Meetup } from './entities/meetup.entity';

@Injectable()
export class MeetupService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MeetupsCreateInput): Promise<Meetup> {
    return this.prisma.meetups.create({ data });
  }

  async findAll(query: PaginationDto): Promise<Array<Meetup>> {
    const { sortBy, sortOrder, filterBy, filterValue } = query;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const order = sortBy && sortOrder ? { [sortBy]: sortOrder } : {};

    let where = {};
    if (filterBy && filterValue) {
      if (filterBy === 'tag') {
        where = {
          meetupTags: {
            some: {
              tag: { equals: filterValue },
            },
          },
        };
      } else {
        where = { [filterBy]: filterValue };
      }
    }
    return this.prisma.meetups.findMany({
      skip: skip,
      take: limit,
      orderBy: order,
      where,
      include: {
        meetupTags: true,
      },
    });
  }

  async findOne(id: number): Promise<Meetup | null> {
    return this.prisma.meetups.findFirst({ where: { id: id } });
  }

  async update(
    id: number,
    data: Prisma.MeetupsUpdateInput,
  ): Promise<Meetup | null> {
    return this.prisma.meetups.update({ where: { id: id }, data });
  }

  async remove(id: number) {
    return this.prisma.meetups.delete({ where: { id: id } });
  }

  async checkOwner(userId: number, meetupId: number) {
    return (
      (await this.prisma.meetups.findFirst({ where: { id: meetupId } }))
        ?.userId === userId
    );
  }
}
