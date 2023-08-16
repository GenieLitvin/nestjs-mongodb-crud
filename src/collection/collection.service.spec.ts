import { Test, TestingModule } from '@nestjs/testing';
import { CollectionService } from './collection.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Multiple } from '../multiple/schemas/multiple.schema';
import { Video } from '../video/schemas/video.schema';
import { Question } from '../question/schemas/question.schema';
import { Fillblank } from '../fillblank/schemas/fillblank.schema';

describe('CollectionService', () => {
  let service: CollectionService;
  let multipleModel: Model<Multiple>;
  let videoModel: Model<Video>;
  let questionModel: Model<Question>;
  let fillblankModel: Model<Fillblank>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionService,
        {
          provide: getModelToken(Multiple.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Video.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Question.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Fillblank.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
    multipleModel = module.get<Model<Multiple>>(getModelToken(Multiple.name));
    videoModel = module.get<Model<Video>>(getModelToken(Video.name));
    questionModel = module.get<Model<Question>>(getModelToken(Question.name));
    fillblankModel = module.get<Model<Fillblank>>(
      getModelToken(Fillblank.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an object with multiples, videos, question, and fillblank', async () => {
      const sampleMultiples = [{ name: 'Multiple 1' }, { name: 'Multiple 2' }];
      const sampleVideos = [{ name: 'Video 1' }, { name: 'Video 2' }];
      const sampleQuestion = [{ name: 'Question 1' }, { name: 'Question 2' }];
      const sampleFillblank = [
        { name: 'Fillblank 1' },
        { name: 'Fillblank 2' },
      ];

      jest.spyOn(multipleModel, 'aggregate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(sampleMultiples),
      } as any);

      jest.spyOn(videoModel, 'aggregate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(sampleVideos),
      } as any);

      jest.spyOn(questionModel, 'aggregate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(sampleQuestion),
      } as any);

      jest.spyOn(fillblankModel, 'aggregate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(sampleFillblank),
      } as any);

      const result = await service.findAll();

      expect(result.multiples).toEqual(sampleMultiples);
      expect(result.videos).toEqual(sampleVideos);
      expect(result.question).toEqual(sampleQuestion);
      expect(result.fillblank).toEqual(sampleFillblank);
    });
  });
});
