import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type MultipleDocument = HydratedDocument<Multiple>;
@Schema()
export class Multiple {
  @Prop()
  sentence: string;

  @Prop(
    raw([
      {
        option: { type: String },
        isCorrect: { type: Boolean },
      },
    ]),
  )
  options: Record<string, any>[];

  @Prop()
  weight: number;

  @Prop()
  topic: string;
}

export const MultipleSchema = SchemaFactory.createForClass(Multiple);
