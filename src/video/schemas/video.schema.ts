import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type VideoDocument = HydratedDocument<Video>;
@Schema()
export class Video {
  @Prop()
  video: string;

  @Prop(
    raw([
      {
        question: { type: String },
        answer: { type: Boolean },
      },
    ]),
  )
  questions: Record<string, any>[];

  @Prop()
  weight: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
