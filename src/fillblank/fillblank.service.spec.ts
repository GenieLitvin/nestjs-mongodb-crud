import { Test, TestingModule } from '@nestjs/testing';
import { FillblankService } from './fillblank.service';
import { Model } from 'mongoose';
import { Fillblank } from './schemas/fillblank.schema';
describe('FillblankService', () => {
  let service: FillblankService;
  const fillblankModelMock: Partial<Model<any>> = {
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FillblankService,
        {
          provide: Fillblank.name,
          useValue: fillblankModelMock,
        },
      ],
    }).compile();

    service = module.get<FillblankService>(FillblankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
