import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { MeetupService } from './meetup.service';

describe('MeetupService', () => {
  let service: MeetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MeetupService, PrismaService],
    }).compile();

    service = module.get<MeetupService>(MeetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
