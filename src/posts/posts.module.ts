import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { User, UserSchema } from '../users/user.schema';
import { PostHistory, PostHistorySchema} from './post-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PostHistory.name, schema: PostHistorySchema }]),
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
