import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = await this.questionModel.create(createQuestionDto);
    return createdQuestion;
  }
  async update(id: string, questionDto: UpdateQuestionDto): Promise<Question> {
    return this.questionModel.findByIdAndUpdate(id, questionDto, {
      new: true,
    });
  }
  async remove(id: string): Promise<Question> {
    return this.questionModel.findByIdAndRemove(id);
  }
  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }
  async getById(id: string): Promise<Question> {
    return this.questionModel.findById(id);
  }
}
