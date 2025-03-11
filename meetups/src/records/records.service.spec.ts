import { Test, TestingModule } from '@nestjs/testing';

import { RecordsService } from './records.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

describe('RecordsService', () => {
  let service: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [RecordsService, PrismaService,
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },],
    }).compile();

    service = module.get<RecordsService>(RecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

