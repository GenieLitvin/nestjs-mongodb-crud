import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { AnswersArray } from '../validator/questions';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  question: string;

  @IsBoolean()
  answer: boolean;
}

export class CreateVideoDto {
  @IsNotEmpty()
  video: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsArray()
  @ArrayNotEmpty()
  @AnswersArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
