import { Test, TestingModule } from '@nestjs/testing';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Model } from 'mongoose';
import { Multiple } from '../multiple/schemas/multiple.schema';
import { Video } from '../video/schemas/video.schema';
import { Question } from '../question/schemas/question.schema';
import { Fillblank } from '../fillblank/schemas/fillblank.schema';

describe('CollectionController', () => {
  let controller: CollectionController;
  let collectionService: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionController],
      providers: [
        CollectionService,
        {
          provide: Multiple.name,
          useValue: Model,
        },
        {
          provide: Video.name,
          useValue: Model,
        },
        {
          provide: Question.name,
          useValue: Model,
        },
        {
          provide: Fillblank.name,
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<CollectionController>(CollectionController);
    collectionService = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
