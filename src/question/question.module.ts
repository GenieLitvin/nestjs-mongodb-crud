import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { questionProviders } from './question.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController],
  providers: [QuestionService, ...questionProviders],
})
export class QuestionModule {}
