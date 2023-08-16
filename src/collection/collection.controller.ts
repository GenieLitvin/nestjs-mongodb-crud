import { Controller, Get } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Multiple } from '../multiple/schemas/multiple.schema';
import { Video } from '../video/schemas/video.schema';
import { Question } from '../question/schemas/question.schema';
import { Fillblank } from '../fillblank/schemas/fillblank.schema';
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  async findAll(): Promise<{
    multiples: Multiple[];
    videos: Video[];
    question: Question[];
    fillblank: Fillblank[];
  }> {
    return this.collectionService.findAll();
  }
}
