import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type MultipleDocument = HydratedDocument<Multiple>;
@Schema()
export class Multiple {
  @ApiProperty({
    example:
      'My sister is very ____, she always wakes up early in the morning.',
    description: 'a sentence with a missing word(s)',
  })
  @Prop()
  sentence: string;

  @ApiProperty({
    example: [
      { option: 'punctual', isCorrect: true },
      { option: 'prompt', isCorrect: false },
    ],
    description: 'missing word answer options',
  })
  @Prop(
    raw([
      {
        option: { type: String },
        isCorrect: { type: Boolean },
      },
    ]),
  )
  options: Record<string, any>[];

  @ApiProperty({
    example: '1',
    description: 'question difficulty (weight)',
  })
  @Prop()
  weight: number;

  @ApiProperty({
    example: '',
    description:
      'grammatical topic, the knowledge of which tests this question',
  })
  @Prop()
  topic: string;
}

export const MultipleSchema = SchemaFactory.createForClass(Multiple);
