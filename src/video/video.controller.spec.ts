import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';

describe('VideoController', () => {
  let controller: VideoController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                video: 'https://www.youtube.com/watch?v=HYWiIWpcCIM',
                weight: 1,
                questions: [
                  {
                    question: 'The author claims that free will exists',
                    answer: false,
                  },
                  {
                    question: 'Since says that free will does not exist',
                    answer: true,
                  },
                ],
              },
            ]),
            create: jest
              .fn()
              .mockImplementation((createVideoDto: CreateVideoDto) =>
                Promise.resolve({ _id: '1', ...createVideoDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get(VideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new video question', async () => {
      const createVideoDto: CreateVideoDto = {
        video: 'https://www.youtube.com/watch?v=HYWiIWpcCIM',
        weight: 1,
        questions: [
          {
            question: 'The author claims that free will exists',
            answer: false,
          },
          {
            question: 'Since says that free will does not exist',
            answer: true,
          },
        ],
      };
      expect(controller.create(createVideoDto)).resolves.toEqual({
        _id: '1',
        ...createVideoDto,
      });
    });
  });
});
