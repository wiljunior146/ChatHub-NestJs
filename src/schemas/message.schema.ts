import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
