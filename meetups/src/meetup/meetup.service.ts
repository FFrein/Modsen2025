import { Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { Prisma } from '@prisma/client';
import { Meetup } from './entities/meetup.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeetupService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MeetupsCreateInput): Promise<Meetup> {
    return this.prisma.meetups.create({ data });
  }

  async findAll(): Promise<Array<Meetup>> {
    return this.prisma.meetups.findMany();
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
}
