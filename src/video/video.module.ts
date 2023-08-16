import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { videoProviders } from './video.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [VideoController],
  providers: [VideoService, ...videoProviders],
})
export class VideoModule {}
