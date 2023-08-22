import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type VideoDocument = HydratedDocument<Video>;
@Schema()
export class Video {
  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=HYWiIWpcCIM',
    description: 'Link to the video',
  })
  @Prop()
  video: string;

  @ApiProperty({
    example: [
      { question: 'The author claims that free will exists', answer: false },
      { question: 'Since says that free will does not exist', answer: true },
    ],
    description: 'The array of the statements and the answer is it true',
  })
  @Prop(
    raw([
      {
        question: { type: String },
        answer: { type: Boolean },
      },
    ]),
  )
  questions: Record<string, any>[];

  @ApiProperty({
    example: '1',
    description: 'question difficulty (weight)',
  })
  @Prop()
  weight: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
