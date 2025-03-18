import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';
import { MeetupController } from './meetup.controller';
import { MeetupService } from './meetup.service';

describe('MeetupController', () => {
  let controller: MeetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetupController],
      providers: [MeetupService, PrismaService],
    }).compile();

    controller = module.get<MeetupController>(MeetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
