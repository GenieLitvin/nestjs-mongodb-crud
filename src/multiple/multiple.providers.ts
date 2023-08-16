import { Mongoose } from 'mongoose';
import { Multiple, MultipleSchema } from './schemas/multiple.schema';

export const multipleProviders = [
  {
    provide: Multiple.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Multiple', MultipleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
