import * as mongoose from 'mongoose';

import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const host = configService.get<string>('MONGODB_HOST');
      const port = configService.get<string>('MONGODB_DOCKER_PORT');
      const database = configService.get<string>('MONGODB_DATABASE');
      const username = configService.get<string>('MONGODB_USER');
      const password = configService.get<string>('MONGODB_PASSWORD');

      const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
      return await mongoose.connect(connectionString);
    },
    inject: [ConfigService],
  },
];
