import { Test, TestingModule } from '@nestjs/testing';

import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRequestDto } from '../dto/requestDto';
import { Meetup } from 'src/meetup/entities/meetup.entity';

describe('RecordsController', () => {
  let controller: RecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [RecordsService,PrismaService],
    }).compile();

    controller = module.get<RecordsController>(RecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


describe('RecordsController2', () => {
  let recordsController: RecordsController;
  let recordsService: RecordsService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = new PrismaService();
    recordsService = new RecordsService(prisma);
    recordsController = new RecordsController(recordsService);
  });

  describe('findOne', () => {
    it('should return an array of records', async () => {
      const mockRequest = {
        user: {
          id: 1,
          username: 'testuser',
          role:"user"
        },
      } as AuthRequestDto;

      const result = expect.arrayContaining([
        {
          id: expect.any(Number),
          meetup: {
            date: expect.any(Date),
            description: expect.any(String),
            id: expect.any(Number),
            name: expect.any(String),
            place: expect.any(String),
            userId: expect.any(Number),
          },
          meetupId: expect.any(Number),
          userId: expect.any(Number),
        },
      ]);

      //jest.spyOn(recordsService, 'findOne').mockImplementation(() => result);

      expect(await recordsController.findOne(mockRequest)).toMatchObject(result);
    });
  });
});