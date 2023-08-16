import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type FillblankDocument = HydratedDocument<Fillblank>;
@Schema()
export class Fillblank {
  @Prop()
  sentence: string;

  @Prop()
  answer: string;

  @Prop()
  weight: number;

  @Prop()
  topic: string;
}

export const FillblankSchema = SchemaFactory.createForClass(Fillblank);
