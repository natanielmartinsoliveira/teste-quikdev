import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema()
export class Like extends Document {
  
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  postId: string;
  
  @Prop({ type: String, enum: ['like', 'dislike'], required: true })
  type: 'like' | 'dislike';

  
}

export const LikeSchema = SchemaFactory.createForClass(Like);