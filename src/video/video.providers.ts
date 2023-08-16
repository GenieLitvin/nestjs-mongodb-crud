import { Mongoose } from 'mongoose';
import { Video, VideoSchema } from './schemas/video.schema';

export const videoProviders = [
  {
    provide: Video.name,
    useFactory: (mongoose: Mongoose) => mongoose.model('Video', VideoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
