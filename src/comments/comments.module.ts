import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { User, UserSchema } from 'src/users/user.schema';
import { PostSchema, Post } from 'src/posts/post.schema';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    EmailModule
  ],
  providers: [CommentsService, EmailService],
  controllers: [CommentsController]
})
export class CommentsModule {}
