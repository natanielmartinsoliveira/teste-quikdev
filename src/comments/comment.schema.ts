import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Post } from '../posts/post.schema';

@Schema()
export class Comment extends Document {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  description : string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  userId: [User];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Post.name }])
  postId: [Post];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  postUserId: [User];

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);