import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { User } from '../users/user.schema';
import { PostHistory } from './post-history.schema';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(PostHistory.name) private postHistoryModel: Model<PostHistory>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(post: Post, user: any, file: any ): Promise<Post> {
    const fileData : any = file ? file.path : null;
    post.userId = await this.userModel.findOne({_id : user._id});
    post.image = fileData;
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async update(id: string, postData: Post, user: any, file: any): Promise<Post> {
    const fileData : any = file ? file.path : null;
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const userFinded = await this.userModel.findOne({_id : user._id});

    if (post.userId != user._id) {
      throw new ForbiddenException('You are not allowed to edit this post');
    }
    // Save current post state to PostHistory
    const postHistory = new this.postHistoryModel({
      postId: post._id,
      title: post.title,
      description: post.description,
      image: post.image,
      userId : userFinded,
      createdAt: new Date(),
    });
    await postHistory.save();

    post.title = postData.title;
    post.description = postData.description;
    post.userId = await this.userModel.findOne({_id : user._id});
    post.image = fileData;
    return post.save();
  }

  async delete(id: string, user: any): Promise<any> {

    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== user._id) {
      throw new ForbiddenException('You are not allowed to edit this post');
    }
    
    return this.postModel.findByIdAndDelete(id).exec();

  }

  async getHistory(postId: string): Promise<PostHistory[]> {
    return this.postHistoryModel.find({ postId }).sort({_id: -1}).limit(1).exec();
  }

  

  /*async addComment(id: string, comment: { content: string }): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    post.comments.push(comment);
    return post.save();
  }*/
}