import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema()
export class Post extends Document {
  _id: Types.ObjectId

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  userId: [User];

  @Prop({ type: String })
  image: string;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  dislikes: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);