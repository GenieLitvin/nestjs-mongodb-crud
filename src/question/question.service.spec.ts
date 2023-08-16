import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
describe('QuestionService', () => {
  let service: QuestionService;
  const questionModelMock: Partial<Model<any>> = {
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getModelToken(Question.name),
          useValue: questionModelMock,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
