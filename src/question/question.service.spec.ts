import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';
describe('QuestionService', () => {
  let service: QuestionService;
  let model: Model<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: Question.name,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(QuestionService);
    model = module.get<Model<Question>>(Question.name);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

