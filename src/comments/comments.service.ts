import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { User } from 'src/users/user.schema';
import { Post } from 'src/posts/post.schema';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>,
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Post.name) private postModel: Model<Post>) {}

    async findAll(postId: any): Promise<Comment[]> {
        if(postId){
            return this.commentModel.find({ postId : postId }).exec();
        }
        return this.commentModel.find().exec();
    }

    async findOne(id: string): Promise<Comment> {
        return this.commentModel.findById(id).exec();
    }

    async create(comment: Comment, user: any, postId : string, text: string): Promise<Comment> {
        const userId = user._id;
        const post : Post = await this.postModel.findOne({_id: postId});
        comment.postId = [post];
        comment.postUserId = await this.userModel.findOne({_id: post.userId});
        comment.userId = await this.userModel.findOne({_id: userId});
        comment.description = text;
        const newComment = new this.commentModel(comment);
        return newComment.save();
    }

    async update(id: string, commentData: Comment, user: any, content: string): Promise<Comment> {
        const comment = await this.commentModel.findById(id).exec();
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        
        if (comment.userId != user._id) {
            throw new ForbiddenException('You are not allowed to edit this comment');
        }

        comment.description = content;
        return comment.save();

        //return this.commentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
    }

    async delete(id: string, user: any): Promise<any> {
        const comment = await this.commentModel.findById(id).exec();
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        
        if (comment.userId != user._id) {
            throw new ForbiddenException('You are not allowed to edit this comment');
        }

        comment.deleted = true;
        return comment.save();

        //return this.commentModel.findByIdAndUpdate(id, { deleted: true }).exec();
        //return this.commentModel.findByIdAndDelete(id).exec();
    }

    async sendEmailToPostUser(postUserId: string, commentContent: string): Promise<void> {
        // Lógica para enviar o e-mail ao usuário da postagem
        console.log(`Sending email to user with id ${postUserId}: New comment - ${commentContent}`);
    }

}