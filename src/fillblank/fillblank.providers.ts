import { Mongoose } from 'mongoose';
import { Fillblank, FillblankSchema } from './schemas/fillblank.schema';

export const fillblankProviders = [
  {
    provide: Fillblank.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Fillblank', FillblankSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
