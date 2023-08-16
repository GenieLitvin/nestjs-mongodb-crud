import { Test, TestingModule } from '@nestjs/testing';
import { MultipleService } from './multiple.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Multiple } from './schemas/multiple.schema';

describe('MultipleService', () => {
  let service: MultipleService;
  const multipleModelMock: Partial<Model<any>> = {
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MultipleService,
        {
          provide: getModelToken(Multiple.name),
          useValue: multipleModelMock,
        },
      ],
    }).compile();

    service = module.get<MultipleService>(MultipleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
