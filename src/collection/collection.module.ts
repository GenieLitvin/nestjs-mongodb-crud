import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
/*import { Multiple, MultipleSchema } from '../multiple/schemas/multiple.schema';
import { Video, VideoSchema } from '../video/schemas/video.schema';
import { Question, QuestionSchema } from '../question/schemas/question.schema';
import {
  Fillblank,
  FillblankSchema,
} from '../fillblank/schemas/fillblank.schema';*/
import { DatabaseModule } from '../database/database.module';
import { collectionProviders } from './collection.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [CollectionController],
  providers: [CollectionService, ...collectionProviders],
})
export class CollectionModule {}
