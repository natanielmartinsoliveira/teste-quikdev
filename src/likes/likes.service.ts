import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './like.schema';
import { Post } from '../posts/post.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel('Like') private readonly likeModel: Model<Like>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async likePost(userId: any, postId: string): Promise<Like> {
    const existingLike = await this.likeModel.findOne({ userId, postId }).exec();
    if (existingLike) {
      throw new ConflictException('User has already liked or disliked this post');
    }

    const newLike = new this.likeModel({ userId, postId, type: 'like' });
    await newLike.save();

    await this.postModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } }).exec();
    return newLike;
  }

  async dislikePost(userId: any, postId: string): Promise<Like> {
    const existingLike = await this.likeModel.findOne({ userId, postId }).exec();
    if (existingLike) {
      throw new ConflictException('User has already liked or disliked this post');
    }

    const newDislike = new this.likeModel({ userId, postId, type: 'dislike' });
    await newDislike.save();

    await this.postModel.findByIdAndUpdate(postId, { $inc: { dislikes: 1 } }).exec();
    return newDislike;
  }

  async getLikes(postId: string): Promise<Like[]> {
    return this.likeModel.find({ postId }).exec();
  }

}
