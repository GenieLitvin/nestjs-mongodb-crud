import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Multiple } from '../multiple/schemas/multiple.schema';
import { Video } from '../video/schemas/video.schema';
import { Question } from '../question/schemas/question.schema';
import { Fillblank } from '../fillblank/schemas/fillblank.schema';

const COUNT_MULTIPLE = 10;
const COUNT_FILLBLANK = 10;
const COUNT_QUESTION = 3;
const COUNT_VIDEO = 2;

@Injectable()
export class CollectionService {
  constructor(
    @Inject(Multiple.name) private multipleModel: Model<Multiple>,
    @Inject(Video.name) private videoModel: Model<Video>,
    @Inject(Question.name) private questionModel: Model<Question>,
    @Inject(Fillblank.name) private fillblankModel: Model<Fillblank>,
  ) {}

  async findAll(): Promise<{
    multiples: Multiple[];
    videos: Video[];
    question: Question[];
    fillblank: Fillblank[];
  }> {
    const multiples = await this.multipleModel
      .aggregate([{ $sample: { size: COUNT_MULTIPLE } }])
      .exec();
    const videos = await this.videoModel
      .aggregate([{ $sample: { size: COUNT_VIDEO } }])
      .exec();
    const question = await this.questionModel
      .aggregate([{ $sample: { size: COUNT_QUESTION } }])
      .exec();
    const fillblank = await this.fillblankModel
      .aggregate([{ $sample: { size: COUNT_FILLBLANK } }])
      .exec();
    return { multiples, videos, question, fillblank };
  }
}
