import { Test, TestingModule } from '@nestjs/testing';
import { FillblankController } from './fillblank.controller';
import { FillblankService } from './fillblank.service';
import { CreateFillblankDto } from './dto/create-fillblank.dto';

describe('FillblankController', () => {
  let controller: FillblankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FillblankController],
      providers: [
        {
          provide: FillblankService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createFillblankDto: CreateFillblankDto) =>
                Promise.resolve({ _id: '1', ...createFillblankDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<FillblankController>(FillblankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
