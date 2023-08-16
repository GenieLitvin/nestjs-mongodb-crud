import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './schemas/question.schema';
import { ValidationPipe } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto);
  }

  @Put(':id')
  update(
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Param('id') id: string,
  ): Promise<Question> {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Question> {
    return this.questionService.getById(id);
  }

  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Question> {
    return this.questionService.remove(id);
  }
}
