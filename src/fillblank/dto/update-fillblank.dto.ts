import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateFillblankDto {
  @IsNotEmpty()
  sentence: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsNotEmpty()
  answer: string;

  //@IsNotEmpty()
  topic: string;
}
