import { Test, TestingModule } from '@nestjs/testing';
import { MultipleController } from './multiple.controller';
import { MultipleService } from './multiple.service';

describe('MultipleController', () => {
  let controller: MultipleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultipleController],
      providers: [
        {
          provide: MultipleService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MultipleController>(MultipleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
