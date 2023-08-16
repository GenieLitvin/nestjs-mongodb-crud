import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(async () => {
    const videoModelMock: Partial<Model<any>> = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: videoModelMock,
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
