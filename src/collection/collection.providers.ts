import { Mongoose } from 'mongoose';
import { Multiple, MultipleSchema } from '../multiple/schemas/multiple.schema';
import { Video, VideoSchema } from '../video/schemas/video.schema';
import { Question, QuestionSchema } from '../question/schemas/question.schema';

import {
  Fillblank,
  FillblankSchema,
} from '../fillblank/schemas/fillblank.schema';
export const collectionProviders = [
  {
    provide: Multiple.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Multiple', MultipleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: Question.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Question', QuestionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: Fillblank.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Fillblank', FillblankSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: Video.name,
    useFactory: (mongoose: Mongoose) => mongoose.model('Video', VideoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
