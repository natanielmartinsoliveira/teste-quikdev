import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Post } from './post.schema';

@Schema()
export class PostHistory extends Document {
  _id: Types.ObjectId

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Post.name }])
  postId: [Post];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  userId: [User];

  @Prop({ required: false })
  image: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}


export const PostHistorySchema = SchemaFactory.createForClass(PostHistory);