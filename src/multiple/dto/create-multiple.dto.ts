import {
  IsNotEmpty,
  IsArray,
  IsInt,
  ArrayNotEmpty,
  ValidateNested,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OptionsArray } from '../validator/options';

class OptionDto {
  @IsString()
  option: string;

  @IsBoolean()
  isCorrect: boolean;
}
export class CreateMultipleDto {
  @IsNotEmpty()
  sentence: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsArray()
  @ArrayNotEmpty()
  @OptionsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  //@IsNotEmpty()
  topic: string;
}
