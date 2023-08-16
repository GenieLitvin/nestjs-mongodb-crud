import { IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {
  @IsNotEmpty()
  question: string;
}
