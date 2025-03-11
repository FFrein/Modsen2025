import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UsersCreateInput): Promise<User> {
    return this.prisma.users.create({ data });
  }

  async findAll(): Promise<Array<User>> {
    return this.prisma.users.findMany();
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.users.findFirst({ where: { username: username } });
  }
}
