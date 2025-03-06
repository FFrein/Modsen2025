import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRecord } from './entities/record.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserRecordsCreateInput): Promise<UserRecord> {
    return this.prisma.userRecords.create({ data });
  }

  async findMy(id: number): Promise<Array<UserRecord>> {
    return this.prisma.userRecords.findMany({
      where: { userId: id },
      include: { meetup: true },
    });
  }

  async getOne(meetupId: number, userId: number): Promise<Array<UserRecord>> {
    return this.prisma.userRecords.findMany({
      where: { userId: userId, meetupId: meetupId },
      include: { meetup: true },
    });
  }

  remove(meetupId: number, userId: number) {
    return this.prisma.userRecords.deleteMany({
      where: { userId: userId, meetupId: meetupId },
    });
  }
}
