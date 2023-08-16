import { Mongoose } from 'mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';

export const questionProviders = [
  {
    provide: Question.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Question', QuestionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
